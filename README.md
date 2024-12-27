# Nginx HTTP web server

This repository contains the frontend for smartcooking.

## Getting Started

To set up the frontend locally, you'll need Docker installed. Follow the steps below to build and run the database in a container.

### Setup Steps

1. **Build the Docker Image**:

   ```bash
   docker build -t smartcooking-nginx .
   ```

2. **Run the Docker Container**:

   ```bash
   docker run -d --name Smart-Cooking_Frontend -p 8080:80 smartcooking-nginx
   ```

3. **Access the site**
   Open your brower and access `http://localhost:8080/`
