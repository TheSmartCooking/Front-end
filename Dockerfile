# Use the latest nginx as the base image
FROM nginx:latest

# Set environment variables
ENV TEMP_FRONTEND_DIR=/temp-frontend-files

# Set the shell for safer execution
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Create a non-root user and group
RUN groupadd -r frontenduser && useradd -r -g frontenduser frontenduser

# Copy all files to the container
COPY . /usr/share/nginx/html

# Set ownership of necessary directories
RUN chown -R frontenduser:frontenduser /usr/share/nginx/html \
    && chown -R frontenduser:frontenduser /var/cache/nginx \
    && chown -R frontenduser:frontenduser /var/log/nginx

# Expose the default nginx port (80)
EXPOSE 80

# Add health check for the container
HEALTHCHECK --interval=1m --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Use the default nginx command
CMD ["nginx", "-g", "daemon off;"]
