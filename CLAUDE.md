# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Multi-page marketing website for a lash salon (Uarda Dauti Lashes). Vanilla JavaScript + Vite, no framework and no tests. Content is bilingual (Albanian `al` / English `en`); a language toggle (`src/utils/language.js`) persists the active language via `localStorage` and defaults to `al`. Wired into `home.js` and `services.js`.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — serve the production build

All four HTML entry points (`index.html`, `about.html`, `contact.html`, `services.html`) live at the project root and are registered as build inputs in `vite.config.js` — add any new page there too.

## Styling

Plain CSS, no framework. `src/styles/global.css` is the design-token legend — all colors, fonts, spacing, and radii are `:root` custom properties there, plus the reset/base type and shared components (`.btn-pill`, `.section-eyebrow`, `.section-title`, `.section-sub`, `.flourish`). Each page section has its own file under `src/styles/sections/` that consumes only those tokens; everything is wired via `@import` in `src/styles/main.css`, which pages load with a `<link>` tag.

## Architecture

The design contract is documented in `Documentation/Architecture.md` (plus per-page layout docs in the same folder). The core rule is a strict one-way pipeline:

**JSON data → transformation → rendering**

1. **Data layer** — `src/data/*.json`, one file per model (services, media, businessIdentity, contactInformation, achievements, bio, form). Data is treated as immutable. Model field contracts are defined in Section C of `Documentation/Architecture.md`. Translatable fields are objects keyed by language code (`{ "al": ..., "en": ... }`); media is referenced by ID via `mediaRefs` and resolved against `media.json` during transformation.
2. **Transformation layer** — `src/components/transformations/transform*.js`. Pure functions that convert raw model data into UI-ready structures shaped like `{ type, id?, content: {...} }`, selecting the active language, resolving media refs, and applying `visibility` filtering and `order` sorting. Renderers must never see raw JSON.
3. **Rendering layer** — `src/components/renderers/render*.js`. Each takes a transformed UI structure plus a container element, clears the container, and builds DOM via `document.createElement` (no innerHTML templating, no business logic, no data transformation).

Page orchestrators (currently only `src/components/home.js`, called from `src/main.js`) wire the pipeline: import JSON, transform, then render into placeholder sections that the HTML pages provide as empty, class-named containers (e.g. `.hero`, `.main-cta`, `.services-preview`).

When adding a section or page, follow the existing pattern: add/extend a JSON model, write a `transformX.js` and matching `renderX.js` pair, and wire them in the page's init function against a placeholder element in the HTML.

## Interactions

Contact actions are deep links (`tel:`, `https://wa.me/<number>`, Instagram/Facebook/TikTok profile URLs) taken from `contactInformation.json` — see Section E of `Documentation/Architecture.md`.
