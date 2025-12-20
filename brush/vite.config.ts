import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      fileName: () => "brush.js",
      formats: ["iife"],
      name: "Brush",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
    outDir: "../assets",
    emptyOutDir: false,
    minify: true,
    sourcemap: "inline",
  },
});
