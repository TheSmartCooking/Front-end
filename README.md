# Nginx HTTP Web Server

This repository contains the frontend for SmartCooking.

## Getting Started

### Recommended: Using DevContainer

For a seamless development experience, we recommend using a DevContainer.
This ensures all dependencies are correctly installed without requiring contributors to set up their local environment manually.

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- Visual Studio Code with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Steps to Use the DevContainer

1. Open this repository in Visual Studio Code.
2. If you have the Dev Containers extension installed, Visual Studio Code will prompt you to reopen the project inside the container.
   - If not prompted, open the Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS) and run **"Reopen in Container"**.
3. The container will set up automatically, installing dependencies and preparing the environment.
4. Start the development server with:

   ```bash
   npm run dev
   ```

Now you're ready to develop the frontend in a standardized environment!

---

### Nuxt Minimal Development Server

If you prefer to develop locally without a DevContainer, follow these steps:

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

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Docker Image and Container and Hosting with Nginx

To set up the frontend locally using Docker, follow these steps:

1. **Build the Docker Image**:

   ```bash
   docker build -t smartcooking-nginx .
   ```

2. **Run the Docker Container**:

   ```bash
   docker run -d --name Smart-Cooking_Frontend -p 8080:80 smartcooking-nginx
   ```

3. **Access the Site**: Open your browser and visit `http://localhost:8080/`.
