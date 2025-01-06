# Nginx HTTP Web Server

This repository contains the frontend for SmartCooking.

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

3. **Access the Site**:
   Open your browser and access `http://localhost:8080/`.

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install dependencies:

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

### Development Server

Start the development server on `http://localhost:3000`:

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

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
