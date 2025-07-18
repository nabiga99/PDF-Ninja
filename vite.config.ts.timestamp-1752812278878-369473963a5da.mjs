// vite.config.ts
import { defineConfig } from "file:///D:/AI%20Coding/PDF%20Ninja/node_modules/vite/dist/node/index.js";
import react from "file:///D:/AI%20Coding/PDF%20Ninja/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///D:/AI%20Coding/PDF%20Ninja/node_modules/lovable-tagger/dist/index.js";
import sitemap from "file:///D:/AI%20Coding/PDF%20Ninja/node_modules/vite-plugin-sitemap/dist/index.js";
var __vite_injected_original_dirname = "D:\\AI Coding\\PDF Ninja";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    sitemap({
      hostname: "https://pdfninja.xyz",
      // IMPORTANT: Replace with your actual domain
      dynamicRoutes: [
        "/",
        "/compress",
        "/extract",
        "/delete",
        "/esign",
        "/unlock",
        "/protect",
        "/redact",
        "/uneditable",
        "/watermark",
        "/merge"
      ]
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBSSBDb2RpbmdcXFxcUERGIE5pbmphXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxBSSBDb2RpbmdcXFxcUERGIE5pbmphXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9BSSUyMENvZGluZy9QREYlMjBOaW5qYS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuaW1wb3J0IHNpdGVtYXAgZnJvbSAndml0ZS1wbHVnaW4tc2l0ZW1hcCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgIHNpdGVtYXAoe1xuICAgICAgaG9zdG5hbWU6ICdodHRwczovL3d3dy55b3VyLWRvbWFpbi5jb20nLCAvLyBJTVBPUlRBTlQ6IFJlcGxhY2Ugd2l0aCB5b3VyIGFjdHVhbCBkb21haW5cbiAgICAgIGR5bmFtaWNSb3V0ZXM6IFtcbiAgICAgICAgJy8nLFxuICAgICAgICAnL2NvbXByZXNzJyxcbiAgICAgICAgJy9leHRyYWN0JyxcbiAgICAgICAgJy9kZWxldGUnLFxuICAgICAgICAnL2VzaWduJyxcbiAgICAgICAgJy91bmxvY2snLFxuICAgICAgICAnL3Byb3RlY3QnLFxuICAgICAgICAnL3JlZGFjdCcsXG4gICAgICAgICcvdW5lZGl0YWJsZScsXG4gICAgICAgICcvd2F0ZXJtYXJrJyxcbiAgICAgICAgJy9tZXJnZScsXG4gICAgICBdLFxuICAgIH0pLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFAsU0FBUyxvQkFBb0I7QUFDM1IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLGFBQWE7QUFKcEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ1YsUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBO0FBQUEsTUFDVixlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxTQUFTLGlCQUNULGdCQUFnQjtBQUFBLEVBQ2xCLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
