# Uarda Dauti Lashes — Website

Marketing website for Uarda Dauti Lashes, a lash salon. A 4-page static site (home, services, about, contact) built with vanilla JavaScript and Vite — no framework, no build-time templating. Content is bilingual (Albanian `al` / English `en`).

## Tech stack

- [Vite](https://vitejs.dev/) — dev server and build
- Vanilla JavaScript (ES modules), no framework
- Plain CSS, no preprocessor or utility framework
- No test runner is currently configured

## Getting started

Requires [Node.js](https://nodejs.org/) and npm.

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
index.html            # home page (build input)
services.html         # services page (build input)
about.html            # about page (build input, skeleton — see Project status)
contact.html          # contact page (build input, skeleton — see Project status)
vite.config.js         # registers the four HTML entry points above

src/
  data/                # JSON data models — services, media, business identity,
                        # contact info, achievements, bio, copy, form, nav
  components/
    transformations/    # transform*.js — pure functions: raw JSON -> UI-ready structures
    renderers/           # render*.js — DOM building only, no logic or data transformation
    home.js              # home page orchestrator
    services.js           # services page orchestrator
  styles/
    global.css            # design tokens (color, type, spacing) + shared components
    main.css               # imports every section stylesheet
    sections/               # one CSS file per page section

public/
  media/                    # image/video assets referenced by src/data/media.json

Documentation/                # architecture contract + per-page layout specs
```

## Architecture

Data flows one way: **JSON → transformation → rendering**. `src/data/*.json` holds immutable data models; `transform*.js` functions select the active language, resolve media references against `media.json`, and apply visibility/order filtering; `render*.js` functions take the transformed structure and build DOM with `document.createElement`. Renderers never see raw JSON, and transformations never touch the DOM.

Each page has an orchestrator (e.g. `src/components/home.js`) that imports data, transforms it, and renders each section into a placeholder container already present in the page's HTML.

See `Documentation/Architecture.md` for the full data-model contract, and the per-page layout docs in the same folder for section-by-section specs.

## Content & i18n

All translatable copy in `src/data/*.json` is stored as `{ "al": ..., "en": ... }`. The active language is currently hardcoded to `al` in `src/components/home.js` — there is a language-toggle UI.

## Media assets

Data files reference media by ID (`mediaRefs`), resolved against `src/data/media.json` at transform time. Missing files or entries are skipped gracefully rather than breaking the page — sections render in their no-media layout until the real asset is added to `public/media/` and registered in `media.json`.

## Project status

Home and services pages are fully built and verified; about and contact pages are still HTML skeletons with no script wired in. See `PROGRESS.md` for the current state, pending work, and rationale behind past decisions.

## License

Proprietary — all rights reserved. See `LICENSE`. Usage is restricted to the Uarda Dauti Lashes business owner; no reuse, modification, or redistribution without written permission from the copyright holder.
