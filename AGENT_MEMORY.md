# Mikuans Agent Memory

This file is intended as an agent-readable summary so `codex-cli` or other agents do not need to reread all project files.

## Project overview
- `mikuans` is a React + Vite + TypeScript frontend loan calculator.
- The app follows the Mikuans formula:
  - `Keuntungan (%) = Tenor × 2.5%`
  - `Total Bayar = Pokok + Keuntungan nominal`
  - `Angsuran = Total Bayar / Tenor`
- Loan amount range: `100000` to `20000000`.
- Tenor range: `3` to `20` minggu.

## Important files
- `src/App.jsx` — main UI + calculation logic.
- `src/main.tsx` — React entrypoint that mounts `<App />`.
- `index.html` — page shell loaded by Vite.
- `vite.config.js` — Vite plugin config.
- `package.json` — dependencies and scripts.
- `mikuans.md` — product requirements and desired UX.
- `update-v1.1-mikuans.md` — QA checklist and deployment expectations.
- `.gitignore` — ignored files; updated to include Node, build, env, logs, editor, cache, OS, temp, and AI context.

## Deployment notes
- Build output is in `dist/`.
- `npm run build` generates production assets.
- `_deploy_to_viantmocy_pages.sh` copies `mikuans/dist/` into `viantmocy/viantmocy.github.io` and pushes to `main`.
- `.github/workflows/deploy-gh-pages.yml` can publish to GitHub Pages via `gh-pages` branch.

## Local preview
- Use `npm run preview` or `python3 -m http.server 4173 --directory /mnt/d/Alfian/mikuans/dist`.

## Notes for other agents
- Do not overwrite `src/main.tsx` with non-JSX content; app must mount using `<App />`.
- Keep `formatRupiah()` and `copyResult()` behavior consistent with Mikuans requirements.
- If modifying deployment, preserve `.nojekyll` in Pages repo and use HTTPS auth when SSH is unavailable.
