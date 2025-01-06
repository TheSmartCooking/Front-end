# Stage 1: Build the Nuxt.js app
FROM node:18-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for static hosting
RUN npm run generate

# Stage 2: Serve the static files using Nginx
FROM nginx:1.27.3

# Set environment variables
ENV TEMP_FRONTEND_DIR=/temp-frontend-files

# Set the shell for safer execution
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Create a non-root user and group
RUN groupadd -r frontenduser && useradd -r -g frontenduser frontenduser

# Create a directory for the PID file and assign ownership to frontenduser
RUN mkdir -p /var/run/nginx && chown -R frontenduser:frontenduser /var/run/nginx

# Copy the generated static files from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx.conf to a writable location and modify the PID path
RUN cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.custom && \
    sed -i 's|/var/run/nginx.pid|/var/run/nginx/nginx.pid|g' /etc/nginx/nginx.conf.custom

# Set ownership of necessary directories
RUN chown -R frontenduser:frontenduser /usr/share/nginx/html \
    && chown -R frontenduser:frontenduser /var/cache/nginx \
    && chown -R frontenduser:frontenduser /var/log/nginx

# Switch to non-root user
USER frontenduser

# Expose the default nginx port (80)
EXPOSE 80

# Add health check for the container
HEALTHCHECK --interval=1m --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Use the custom nginx.conf during runtime
CMD ["nginx", "-c", "/etc/nginx/nginx.conf.custom", "-g", "daemon off;"]
