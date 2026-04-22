
FROM node:22 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build




FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/uploads ./uploads

EXPOSE 3501

CMD ["node", "dist/main.js"]