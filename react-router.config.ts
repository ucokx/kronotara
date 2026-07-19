import type { Config } from "@react-router/dev/config";

export default {
  // Use Cloudflare Pages adapter (no SSR node server needed)
  ssr: true,

  // Future flags — enable all recommended flags for new projects
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
