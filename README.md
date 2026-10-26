# Anahat Basnet · Portfolio 3.0

React 18 + TypeScript + Tailwind CSS + Framer Motion + Lucide. Kanit is self-hosted via `@fontsource/kanit`.

    npm install
    npm run dev       # local dev
    npm run build     # type-check + build to dist/

All content lives in `src/data.ts` (same data as the 2.0 site). Images and the resume are in `public/`.
The hero centrepiece is the "Currently" card; to use a photo instead, replace the `<aside>` in `src/sections/Hero.tsx`.

## 3.1 changes
- Hero uses `public/images/anahat.webp` (background colour-matched to `#0C0C0C`); swap the file to change the photo.
- Floating section nav with active highlight, plus a scroll-progress bar.
- Experience rows: logos, "Current" badge, technology chips.
- Contact: copy-email button with confirmation, live Kathmandu time.
- Set `og:image` in `index.html` to your absolute URL (`https://your-domain/og.jpg`) after deploying.

## Publish
1. `npm install` then `npm run build` (type-checks, then builds into `dist/`).
2. `npm run preview` and check the site once (hero photo edges, nav, phone width).
3. Deploy `dist/` on Vercel or Netlify (framework: Vite, build command `npm run build`, output `dist`), then add the domain `anahat.com.np` in the host's domain settings and set the DNS records it shows at your .np registrar.
4. Add real numbers to the Work cards: in `src/data.ts`, `work`, add `result: "..."` to each item.
