/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  optimizeDeps: {
    exclude: ["wrangler"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  plugins: [
    cloudflareDevProxy({
      getLoadContext({ context }) {
        console.log("==> getLoadContext called by Vite dev proxy!");
        return { cloudflare: context.cloudflare || context };
      }
    }),
    tailwindcss(),
    !process.env.VITEST ? reactRouter() : undefined,
    tsconfigPaths(),
  ],
  resolve: {
    // Ensure maplibre-gl works correctly in Cloudflare env
    alias: {
      "maplibre-gl": "maplibre-gl",
    },
  },
});
