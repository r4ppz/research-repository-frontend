FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_DOCKER_BUILD
ENV VITE_DOCKER_BUILD=$VITE_DOCKER_BUILD

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Standard SPA fix for Nginx
RUN sed -i 's/index  index.html index.htm;/try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

EXPOSE 80
