# Use a specific minor version for reproducibility
FROM node:20.18-alpine AS builder
WORKDIR /app

# Install pnpm via Corepack
# We enable it and immediately fetch the binaries
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only dependency files first to leverage Docker cache
# If these don't change, Docker skips the expensive 'pnpm install' step
COPY pnpm-lock.yaml package.json ./

# Install dependencies
# --frozen-lockfile ensures the build fails if the lockfile is out of sync
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Handle Build Args
ARG VITE_DOCKER_BUILD
ENV VITE_DOCKER_BUILD=$VITE_DOCKER_BUILD

# Build the app
RUN pnpm build

# Production Stage
FROM nginx:stable-alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Optimized SPA Fix (Reliable replacement)
# This replaces the default location block to handle SPA routing correctly
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
