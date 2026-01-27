import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  // Note: to build the image run this: docker build --build-arg VITE_DOCKER_BUILD=true -t r4ppzf/research-repo-frontend:latest .
  // then push to the repo: docker push r4ppzf/research-repo-backend:latest
  const isDockerBuild = process.env.VITE_DOCKER_BUILD === "true";

  return {
    plugins: [
      react({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    ],
    preview: {
      allowedHosts: true, // for testing
    },
    base: isDevelopment || isDockerBuild ? "/" : "/research-repository/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      chunkSizeWarningLimit: 600, // Increase from default 500 kB
    },
  };
});
