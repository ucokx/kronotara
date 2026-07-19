import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxyVitePlugin } from "@react-router/cloudflare/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    // Ensure maplibre-gl works correctly in Cloudflare env
    alias: {
      "maplibre-gl": "maplibre-gl",
    },
  },
});
