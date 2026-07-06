# Progress — Uarda Dauti Lashes Website

_Last updated: 2026-07-06 (as of commit `97e01b0`)_

## Current state

The **homepage is designed, built, and pushed**. It runs the full JSON → transformation → rendering pipeline across nine alternating charcoal/cream sections, styled with a reusable plain-CSS design system, verified in the browser at desktop and mobile widths with no console errors. Production build passes. The site is not yet deployed.

## Done

- **Project plumbing** — root `CLAUDE.md`, flat page URLs (`/about.html`, `/services.html`, `/contact.html` build to `dist/` root), fixed Vite build inputs.
- **Homepage data pipeline** — transform/render pairs for all nine sections: header/nav, hero, trust strip, featured service, services preview, achievements slider, about, contact CTA, footer. New data files: `navigation.json`, `trustHighlights.json`, `homeCopy.json`.
- **Design system** — `src/styles/global.css` is the token legend (charcoal `#211c18`, cream `#f0e7d8`, terracotta-gold accent `#c68b5e`, Cormorant Garamond display + Jost body, spacing/radii scales) plus shared components (`.btn-pill`, `.section-eyebrow`, `.section-title`, `.section-sub`, `.flourish` sunburst). One CSS file per section in `src/styles/sections/`, wired via `@import` in `main.css`, loaded with a `<link>` tag so JS-less pages can reuse it.
- **Interactions** — achievements slider (prev/next + 5s autoplay, stops on manual interaction), tel:/mailto:/Google-Maps deep links in the CTA, social icon links throughout.
- **Fixes along the way** — achievement description was transformed but never rendered; `transformServices` dropped the media `type` field, letting a video render in an `<img>`; hero photo compressed 7.8 MB → 143 KB.

## Pending

- **Sub-pages are skeletons** — `about.html`, `services.html`, `contact.html` have placeholder sections, no scripts, no styling. They don't even load `main.js`. The design system and transforms (e.g. `transformServices` without a limit) are ready to be reused there.
- **Copy review (user)** — everything Claude drafted is isolated in `src/data/trustHighlights.json` and `src/data/homeCopy.json` (section headings, services/CTA sub-lines, trust items). Edit the JSON directly. Trust-strip Font Awesome icons are also swappable there.
- **Media assets** — only one real photo exists (hero portrait). `media.json` references `media1`–`media16` but defines only two entries (one being a video with a dead file path). Service cards and the featured section currently render in their intentional no-photo style; add real photos to `public/media/` + `media.json` to light them up.
- **Language toggle** — `al` is hardcoded in `home.js`; all data is already bilingual al/en. Needs a UI toggle + persistence.
- **Contact form** — modeled in `form.json`/architecture docs but not built; needs a mail backend or external handler (site is static).
- **Vercel deploy** — nothing configured yet; standard static Vite build should work as-is.
- **Real-device mobile check** — responsive layout was verified via an embedded 390px frame (Chrome was fullscreen and couldn't be resized); spot-check on a phone after deploying.

## Decisions & rationale

| Decision | Why |
|---|---|
| Pages flattened to root URLs (moved files, not config tricks) | Zero extra code; dev URLs match production; done while pages had no inbound links |
| Nav links live in `navigation.json`, headings in `homeCopy.json` | Architecture rule: UI originates from data only; keeps future language toggle trivial |
| Trust-strip/philosophy copy drafted only from `bio.json` facts | User instruction: no invented marketing claims; all drafts flagged for review |
| Featured service = Professional Lash Courses (`service8`) | User's pick: it's the differentiator and targets a second audience (students) |
| Achievements slider + contact CTA kept and restyled | User's pick: competition wins are real trust content |
| Slider has autoplay, stops on manual interaction | User's pick over manual-only |
| Services preview shows top 6 by `order` + browse-all link | Layout doc: "top N according to order field"; full list belongs to services page |
| Missing media refs are skipped, never fatal | `media.json` is incomplete by design right now; pages must render without photos |
| Cormorant Garamond + Jost via Google Fonts | Brief demanded serif display + non-Inter sans; matches reference's elegant mood |
| CSS `:has()` used for image-less card / featured layout variants | Keeps renderers free of layout logic; fine for modern browsers |

## Next steps (suggested order)

1. Review/edit drafted copy in `trustHighlights.json` and `homeCopy.json`.
2. Build the **services page** (full list — `transformServices` with no limit, policies + durations, reuse card styles).
3. Build the **about page** (longBio, achievements, salon gallery) and **contact page** (form UI + a form backend such as a mail handler, plus the Maps embed).
4. Add real photos/videos to `public/media/` and complete `media.json` entries.
5. Deploy to Vercel; check the homepage on a real phone.
6. Language toggle (al/en) in the header.
