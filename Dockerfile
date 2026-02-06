# --- STAGE 1: BUILD STEP ---
FROM node:18-alpine as build

WORKDIR /app

# Copy dependency manifest first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Build assets; Vite reads env vars from .env or build args
RUN npm run build

# --- STAGE 2: NGINX SERVER ---
FROM nginx:alpine

# Copy compiled dist files into Nginx document root
COPY --from=build /app/dist /usr/share/nginx/html

# Provide custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose default HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]