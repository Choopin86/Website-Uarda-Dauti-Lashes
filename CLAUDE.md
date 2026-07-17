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

## Learning-mode workflow (About page build)

The owner is building the About page (`about.html`) themselves as a learning exercise and asked to be guided step by step rather than have the code written for them. When resuming this work, keep using this method:

- **Claude does not write the implementation code.** Point to an existing analogous file already in the codebase (e.g. `transformServicesIntro.js`/`renderServicesIntro.js` as the model for `transformAboutHeader.js`/`renderAboutHeader.js`) and describe the shape/pattern to follow; the owner writes the actual code.
- **Break every step into small fractions** — one small, concrete edit at a time (e.g. "just the function skeleton," then "just the media lookup," then "just one field of the return object"). Do not hand over a multi-part step in one message; the owner explicitly asked for smaller fractions than the original plan.

- **After each fraction**, the owner says "done, check it" — read the file fresh (don't trust the diff from memory) and either confirm it's correct or explain _why_ it's a bug (root cause, not just the fix) before moving to the next fraction.

- **If a file appears unchanged after "done"**, say so plainly and ask the owner to confirm the save reached disk, rather than assuming the fix was applied.
- Progress is tracked via the task list (`TaskCreate`/`TaskUpdate`) with one task per page section: Page Header, Business Story (+ `portraitMediaId` data gap), Achievements (reuse existing `transformAchievements`/`renderAchievements` from the homepage as-is), orchestrator wiring, and final browser verification. See `Documentation/About Us Page Layout.md` for the numbered sections being built. (Salon Environment section was dropped per client decision — not part of the page.)

- **Current resume point:** About page styling pass is underway. Done: `.about-header` (Page Header) and `.business-story`/`.portrait-container`/`.bio-container` (Business Story) are both styled and verified in-browser — circular portrait frames (new `--radius-circle` token in `global.css`), side-by-side grid layouts (owner chose portrait-first order in both sections, a deliberate deviation from the homepage hero's text-first order), new files `src/styles/sections/about-header.css` and `business-story.css` wired into `main.css`. `renderAboutHeader.js` and `renderAboutBio.js` were updated to assign `className`s to the elements they create (they didn't before — every other renderer in the codebase does this, e.g. `renderHero.js`), and both required a JS wrapper-div restructure (matching `renderHero.js`'s wrapper/portrait split) to support the two-column grid. Both sections also needed a full-bleed background fix: the section element must carry only background/color/padding while a *separate inner wrapper* carries the grid + `max-width` + `margin: 0 auto` — mirroring `.trust-strip`/`.trust-items` in `trust.css`. Getting this wrong (constraining the section itself instead of an inner wrapper) silently clips the background to the centered content width instead of spanning edge-to-edge — check for this pattern if any future section looks narrower than its neighbors. Not started yet: `.achievements-section` — note most of `achievements.css`'s inner rules (`.achievement-slide`, `.achievement-image`, etc.) are unscoped and already apply automatically since `renderAchievements` is reused as-is from the homepage; only the container-level background/padding and the `.section-title`/`.section-sub` color overrides (currently scoped to `.achievements-preview`) still need equivalents scoped to `.achievements-section`. That section already omits `max-width` from its own container, so it won't need the full-bleed fix. After that: final in-browser verification in both languages (Task 4).
