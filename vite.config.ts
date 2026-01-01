import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", {}]],
        },
      }),
    ],
    base: isDevelopment ? "/" : "/research-repository/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
