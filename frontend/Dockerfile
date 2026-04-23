FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG VITE_API_URL
ARG VITE_IMAGE_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_IMAGE_URL=$VITE_IMAGE_URL

RUN npm run build


FROM node:22-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
