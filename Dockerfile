# Use Node.js v20 as recommended by dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Ensure a clean install, and use 'ci' for reproducible builds
RUN npm ci

# Copy the rest of the source code
COPY . .

# Add a build argument to potentially disable a feature if needed
ARG CI=true
# Build the documentation
RUN npm run build

# --- Final Stage ---
FROM nginx:alpine

# Copy the built static files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy your custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]