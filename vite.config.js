import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? "/question-index/",
  build: {
    rollupOptions: {
      output: {
        // Split the heavy vendor libraries out of the app bundle so no single
        // chunk trips Rollup's 500 kB warning. KaTeX in particular is large.
        manualChunks: {
          katex: ["katex"],
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
