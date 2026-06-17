import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/core": path.resolve(__dirname, "src/core"),
      "@/ui": path.resolve(__dirname, "src/ui"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    alias: {
      "@/core": path.resolve(__dirname, "src/core"),
      "@/ui": path.resolve(__dirname, "src/ui"),
    },
  },
});
