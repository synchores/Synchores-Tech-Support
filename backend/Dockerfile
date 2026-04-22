# =========================
# BUILD STAGE
# =========================
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# =========================
# PRODUCTION STAGE
# =========================
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production

# Install ONLY production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output only
COPY --from=builder /app/dist ./dist

# If you use uploads locally in backend
COPY --from=builder /app/uploads ./uploads

EXPOSE 4000

# Direct node execution (better than npm script)
CMD ["node", "dist/main.js"]