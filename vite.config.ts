import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
        react(),
    sitemap({
      hostname: 'https://pdfninja.xyz', // IMPORTANT: Replace with your actual domain
      dynamicRoutes: [
        '/',
        '/compress',
        '/extract',
        '/delete',
        '/esign',
        '/unlock',
        '/protect',
        '/redact',
        '/uneditable',
        '/watermark',
        '/merge',
      ],
    }),

  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  }
}));
