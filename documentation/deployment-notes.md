# Synchores Tech Support - Deployment Notes

## Overview
This document summarizes the fixes that made the deployment work on the VPS (Hostinger), along with the reasons behind each change.

## 1) Nginx + Certbot

### Problem
Certbot failed because Nginx referenced SSL certificates that did not exist yet.

### Fix
- Temporarily remove or comment out HTTPS server blocks for new domains.
- Keep HTTP blocks only so Nginx can start.
- Run Certbot to issue certificates.
- Re-enable HTTPS blocks after certs are created.

### Working HTTPS block pattern
- HTTP: redirect only
- HTTPS: proxy to containers

Example:

```
# BETA
server {
  listen 80;
  server_name beta.synchores.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name beta.synchores.com;

  ssl_certificate /etc/letsencrypt/live/beta.synchores.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/beta.synchores.com/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location / {
    proxy_pass http://127.0.0.1:3251;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:3501/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

# APP
server {
  listen 80;
  server_name app.synchores.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name app.synchores.com;

  ssl_certificate /etc/letsencrypt/live/app.synchores.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.synchores.com/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  location = / {
    return 302 /login;
  }

  location / {
    proxy_pass http://127.0.0.1:3252;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:3501/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## 2) Nginx routing for beta and app

### Problem
- beta was redirect-only on HTTPS, so it never proxied
- app used the beta cert in some blocks
- duplicate server blocks caused conflicts

### Fix
- Keep only one HTTP and one HTTPS block per domain.
- beta HTTPS block proxies to port 3251.
- app HTTPS block proxies to port 3252.
- app HTTPS block uses app certs.

To block admin routes on beta:

```
location ^~ /login {
  return 404;
}
```

## 3) Backend image failing to start

### Problem
Backend container crashed with:
- Cannot find module '@nestjs/config'
- Cannot find module '@nestjs/typeorm'

Reason: runtime packages were in devDependencies, but the Docker image installs production deps only:
- Dockerfile uses: npm ci --omit=dev

### Fix
Move runtime packages to dependencies:
- @nestjs/config
- @nestjs/typeorm
- @nestjs/graphql
- @nestjs/jwt
- @nestjs/passport
- @nestjs/apollo
- @as-integrations/express5
- bcrypt, class-transformer, class-validator
- graphql, mysql2, passport, passport-jwt

Then rebuild and redeploy the backend image via Portainer.

Dockerfile behavior that caused this:

```
RUN npm ci --omit=dev
```

## 4) Database connection failures

### Problem
Backend connected from Docker network (172.24.0.x), but MySQL only allowed other host ranges.

### Fix
- Use Docker gateway IP as DB_HOST
  - From server: docker network inspect synchores-landing-redesign_default | grep Gateway
  - Example: 172.24.0.1

Environment values used:

```
DB_HOST=172.24.0.1
DB_PORT=3306
DB_USER=synchores
DB_PASSWORD=yourpassword
DB_NAME=synchores_techsupport_db
```

- Grant DB access for Docker subnet:
  - CREATE USER 'synchores'@'172.24.%' IDENTIFIED BY 'yourpassword';
  - GRANT ALL PRIVILEGES ON synchores_techsupport_db.* TO 'synchores'@'172.24.%';
  - FLUSH PRIVILEGES;

- Set DB_USER/DB_PASSWORD in backend env to the new user.

## 5) GraphQL schema error

### Problem
Apollo error:
- Query root type must be provided

Reason: AUTO_SCHEMA was false, so no schema was generated in code-first setup.

### Fix
- Set AUTO_SCHEMA=true for production (code-first).
- Ensure the container actually receives AUTO_SCHEMA=true.

GraphQL module config:

```
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: process.env.AUTO_SCHEMA === 'true',
  playground: process.env.PLAYGROUND === 'true',
  context: ({ req }) => ({ req }),
})
```

Env values used:

```
AUTO_SCHEMA=true
PLAYGROUND=false
```

If AUTO_SCHEMA is still false in the container, check the actual compose env values in Portainer and redeploy the stack.

## 6) Portainer redeploy notes

### Problem
Changes were made locally but the server container still used old images.

### Fix
- Commit and push changes to the repo
- In Portainer: Update/Deploy the stack so it rebuilds images

Env inspection command used:

```
docker inspect synchores-backend --format '{{json .Config.Env}}'
```

## Quick verification commands

On server:
- Backend status: docker ps | grep synchores-backend
- Backend logs: docker logs --tail 200 synchores-backend
- Backend health: curl -I http://127.0.0.1:3501

Nginx:
- Test: sudo nginx -t
- Reload: sudo systemctl reload nginx

Env check:
- docker inspect synchores-backend --format '{{json .Config.Env}}'
