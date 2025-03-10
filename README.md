# Nginx HTTP Web Server

This repository contains the frontend for SmartCooking.

## Getting Started

### Nuxt Minimal Development Server

-   To develop the frontend locally, you'll need Nuxt.js installed. Follow the steps below to develop the frontend with Nuxt.js.

1. Install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

2. Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

Look at the
[Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to
learn more.

### Docker image and Container and hosting with Nginx

To set up the frontend locally, you'll need Docker installed. Follow the steps
below to build and run the frontend in a container.

1. **Build the Docker Image**:

    ```bash
    docker build -t smartcooking-nginx .
    ```

2. **Run the Docker Container**:

    ```bash
    docker run -d --name Smart-Cooking_Frontend -p 8080:80 smartcooking-nginx
    ```

3. **Access the Site**: Open your browser and access `http://localhost:8080/`.
