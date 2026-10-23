import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tokensPlugin from "./src/theme/vitePlugin.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tokensPlugin()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Keep the framework and the component library out of each page's chunk
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          mui: ["@mui/material", "@emotion/react", "@emotion/styled"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
