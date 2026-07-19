# KRONOTARA - SETUP & CONFIGURATION GUIDE
**Version:** 1.0 (MVP)
**Stack:** Remix (Vite), Cloudflare Pages, Cloudflare D1, Tailwind CSS, MapLibre GL, Deck.gl.

github repo: git@github.com:ucokx/kronotara.git

use this skill: https://ui-ux-pro-max-skill.nextlevelbuilder.io/

## ⚠️ STRICT RULES FOR LLM / JUNIOR DEV
1. **NO NODE.JS APIs:** This project runs on Cloudflare Workers/Pages (V8 Isolates). Do NOT use `fs`, `path`, or standard Node.js server dependencies.
2. **DATABASE:** Do NOT install Prisma, TypeORM, or Postgres. We use **Cloudflare D1** (Serverless SQLite) directly via `env.DB`.
3. **STYLING:** Use Tailwind CSS. Do NOT write custom `.css` files unless absolutely necessary for MapLibre overrides.
4. **COMPONENTS:** We use `shadcn/ui` based on Radix UI.
5. **MAP RENDERING:** Do NOT use React-Leaflet or Google Maps. Use `maplibre-gl` for the basemap and `@deck.gl/react` for the heatmap layer.
6. Code must comply with SOLID principle in design pattern.
7. This web apps has to pass top 10 owasp.
8. Code must be well-documented.
9. Code must be efficient and optimized.
10. Code must be scalable.
11. Code must be maintainable.
12. Code must be testable.
12. Code must be secure.
13. Code must be accessible.
14. Code must be user-friendly.
15. Code must be SEO-friendly.
16. Code must be mobile-friendly.
17. Code must be responsive.