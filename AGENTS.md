# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Start the dev server:

```
npx astro dev --port 4321
```

Because `base: 'our-story'` is set in `astro.config.mjs`, the local dev server serves at `http://localhost:4321/our-story/`.

Build for production:

```
npm run build
```

The site deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

## Architecture

Single-page Astro site. `src/pages/index.astro` is the sole page — it imports and stacks sections in order with no logic of its own.

**Content lives in `src/content/`** — edit these files to add/update data without touching components:
- `photos.ts` — photo carousel entries (src paths relative to `public/`)
- `letters.ts` — mini letter cards
- `timeline.ts` — timeline events (Timeline is currently disabled in `index.astro`)

**Components are organized by section** under `src/components/`:
- `hero/` — full-viewport Rapunzel-inspired animated background (stars, lanterns, fireflies, tower, forest — all generated via inline `<script>`)
- `counter/` — relationship counter from May 6 2026; `Counter.tsx` is React (`client:load`) for live updates. Years/months/days use UTC date-only comparison so the anniversary day shows the correct value all day.
- `gallery/` — `Gallery.astro` wraps `Slider.tsx` (React, `client:load`). A single photo hides arrows/dots and shows 3 "Próximamente" placeholder slots instead. Images must be prefixed with `import.meta.env.BASE_URL` (passed as `base` prop) for GitHub Pages path compatibility.
- `timeline/` — built but disabled; import and `<Timeline />` are commented out in `index.astro`.
- `letters/` — static grid of `LetterCard.astro` with wax-seal styling.

**Styling** — no CSS framework. Scoped `<style>` blocks per component. Global fonts (Cinzel Decorative, Lora) via Google Fonts in `Layout.astro`. Color palette: deep purple backgrounds (`#060210`, `#0a0414`), gold accents (`#fde68a`, `#f5c842`, `#c9a84c`), cream text (`#f5e6c8`).

**React components** receive all dynamic data as props from their Astro wrappers — they do not import content files directly (except for TypeScript types).

## Documentation

- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components (React)](https://docs.astro.build/en/guides/framework-components/)
- [Deploying to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
