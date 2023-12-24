import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./index.html"),
        sketch1: resolve(__dirname, "./pages/sketch1/sketch1.html"),
        sketch2: resolve(__dirname, "./pages/sketch2/sketch2.html"),
        sketch3: resolve(__dirname, "./pages/sketch3/sketch3.html"),
      },
    },
  },
});