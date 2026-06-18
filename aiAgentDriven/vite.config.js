import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

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
    environmentOptions: {
      jsdom: { url: "http://localhost" },
    },
    globals: true,
    passWithNoTests: true,
    setupFiles: "./src/test/setup.js",
    alias: {
      "@/core": path.resolve(__dirname, "src/core"),
      "@/ui": path.resolve(__dirname, "src/ui"),
    },
  },
});
