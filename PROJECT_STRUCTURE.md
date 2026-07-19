# Mikuans Project Structure

This document explains the folder and file layout of the `mikuans` project so other agents can revise and modify it without guessing.

## Root
- `index.html` — Vite HTML entry point. Contains `<div id="root"></div>` and loads `/src/main.ts`.
- `package.json` — project metadata, scripts, and dependencies.
- `package-lock.json` — locked dependency tree.
- `vite.config.js` — Vite configuration.
- `tsconfig.json` — TypeScript compiler options.
- `tsconfig.node.json` — TypeScript node-specific config.
- `.gitignore` — ignored files for this project.

## Source (`src/`)
- `src/main.tsx` — React app entry point. Mounts `<App />` into `#root`.
- `src/App.jsx` — main calculator app component.
- `src/style.css` — global styles for the app.
- `src/assets/` — any static assets used by the app.
- `src/components/` — component files if the app grows.

## Public
- `public/` — static public assets copied as-is into the build.

## Build output
- `dist/` — generated production build files from `npm run build`.

## How it works
1. `npm install` installs dependencies.
2. `npm run dev` starts Vite development server.
3. `npm run build` creates production build in `dist/`.
4. `npm run preview` serves the built `dist/` files locally.

## Key behaviors
- The app uses Mikuans loan formula:
  - `Keuntungan (%) = Tenor × 2.5%`
  - `Total Bayar = Pokok + (Pokok × Keuntungan)`
  - `Angsuran = Total Bayar / Tenor`
- The app supports loan amounts between `Rp100.000` and `Rp20.000.000`.
- Tenor options are 3–20 minggu.
- Results are formatted with Indonesian Rupiah formatting.
- `Copy Hasil` copies the result summary in the required WhatsApp text format.

## If you are revising
- Keep `src/App.jsx` as the primary business logic and UI.
- Keep `src/main.tsx` responsible for mounting the React app.
- If you change build outputs, update `dist/` by running `npm run build`.
- If you modify the page path or deploy target, also update `.github/workflows/deploy-gh-pages.yml` or `_deploy_to_viantmocy_pages.sh`.
