# Progress — Uarda Dauti Lashes Website

_Last updated: 2026-07-06_

## Current state

The **homepage and services page are designed, built, and verified in the browser**. Both run the full JSON → transformation → rendering pipeline, styled with a reusable plain-CSS design system, with no console errors at desktop and mobile widths. Production build passes. The site is not yet deployed.

## Done

- **Project plumbing** — root `CLAUDE.md`, flat page URLs (`/about.html`, `/services.html`, `/contact.html` build to `dist/` root), fixed Vite build inputs.
- **Homepage data pipeline** — transform/render pairs for all nine sections: header/nav, hero, trust strip, featured service, services preview, achievements slider, about, contact CTA, footer. New data files: `navigation.json`, `trustHighlights.json`, `homeCopy.json`.
- **Design system** — `src/styles/global.css` is the token legend (charcoal `#211c18`, cream `#f0e7d8`, terracotta-gold accent `#c68b5e`, Cormorant Garamond display + Jost body, spacing/radii scales) plus shared components (`.btn-pill`, `.section-eyebrow`, `.section-title`, `.section-sub`, `.flourish` sunburst). One CSS file per section in `src/styles/sections/`, wired via `@import` in `main.css`, loaded with a `<link>` tag so JS-less pages can reuse it.
- **Interactions** — achievements slider (prev/next + 5s autoplay, stops on manual interaction), tel:/mailto:/Google-Maps deep links in the CTA, social icon links throughout.
- **Fixes along the way** — achievement description was transformed but never rendered; `transformServices` dropped the media `type` field, letting a video render in an `<img>`; hero photo compressed 7.8 MB → 143 KB.
- **Services page data pipeline** — 5 sections wired: shared header/nav, full services list (`transformServicesList`/`renderServicesList`, reusing `transformServices` with no limit), a `<dialog>`-based service detail view (`transformServiceDetail`/`renderServiceDetail` — title, description, duration, price, policies, video, image gallery, "Book now" button that closes the dialog and scrolls to the booking row), an icon-only booking CTA (`transformBookingCTA`/`renderBookingCTA` — tel/WhatsApp/Instagram/TikTok), and the shared footer. New entry point `src/main-services.js`. New data file `src/data/servicesCopy.json` (list heading/sub, dialog labels — drafted copy, needs review like the homepage copy). Verified in-browser: card grid, dialog open/close (button, backdrop click), language toggle, booking row, footer — no console errors.
- **Book button on every service card** — new `contactInformation.json` field `book-link` (Instagram DM deep link `ig.me/m/uarda_dauti.lashes`) flows through `transformServices` into both card renderers (`renderServicesList` on the services page, `renderServices` on the homepage preview). Each card now has its own "Rezervo tani"/"Book now" button opening the link in a new tab; click/keydown propagation is stopped so it doesn't also trigger the card's detail-dialog click handler. Verified in-browser on both pages.
- **Services page Section 1 "Page Header"** — new `businessIdentity.json` fields `servicesIntroText` (drafted intro line, al/en) and `servicesCoverImage` (media ref); new dummy `media.json` entry `services-cover-image-id` as a placeholder until a real cover photo exists. New `transformServicesIntro`/`renderServicesIntro` pair renders a cream band with the cover image on top and the centered intro line below, no links/buttons per the doc's constraint. Wired into `services.js` and a new `.services-intro` placeholder in `services.html`, styled via new `src/styles/sections/services-intro.css`.

## Pending

- **Services page vs. `Documentation/Services Page Layout.md` — 3 gaps remain (2026-07-10 audit), start here tomorrow:**
  1. **Section 4 "Booking CTA" doesn't match the doc.** Doc: Instagram-only action, "not the full icon set used on the homepage/footer," scoped to the currently open service, with visible text like "Message us about [Service Title]" next to it (Instagram can't pre-fill DM text). Actual `transformBookingCTA`/`renderBookingCTA` render phone + WhatsApp + Instagram + TikTok (the full icon set) and take no service/serviceId — not scoped, no service-title text anywhere.
  2. **Section 2 "Services List" cards have an undocumented direct "Book Now" link** (straight to the Instagram `book-link`, added per the 2026-07-06 "Book button on every service card" change). Doc's only specified card interaction is opening the detail view; this creates two competing booking paths and undercuts Section 4's purpose as documented.
  3. **Minor: cards render a `category` field** not listed in the doc's Section 2 "Displays" (title, shortDescription, duration, price, thumbnail) — undocumented, not necessarily wrong.
  - Sections 3 (Detailed View) and 5 (Footer) were checked and match the doc correctly.

- **Sub-pages still skeletons** — `about.html` and `contact.html` have placeholder sections, no scripts, no styling, and don't load any entry script yet. `services.html` is now done; reuse the same pattern (page orchestrator + dedicated `main-<page>.js` entry) for the remaining two.
- **Copy review (user)** — everything Claude drafted is isolated in `src/data/trustHighlights.json`, `src/data/homeCopy.json`, `src/data/servicesCopy.json`, and now `businessIdentity.json`'s `servicesIntroText` (section headings, sub-lines, dialog labels, services intro line). Edit the JSON directly. Trust-strip Font Awesome icons are also swappable there.
- **Media assets** — only one real photo exists (hero portrait). `media.json` references `media1`–`media16` but defines only two entries (one being a video with a dead file path). Service cards and the featured section currently render in their intentional no-photo style; add real photos to `public/media/` + `media.json` to light them up.
- **Language toggle** — `al` is hardcoded in `home.js`; all data is already bilingual al/en. Needs a UI toggle + persistence.
- **Contact form** — modeled in `form.json`/architecture docs but not built; needs a mail backend or external handler (site is static).
- ~~**Vercel deploy**~~ — done; live at custom domain `www.uardadautilashes.com`.
- **Real-device mobile check** — responsive layout was verified via an embedded 390px frame (Chrome was fullscreen and couldn't be resized); spot-check on a phone after deploying.

## Decisions & rationale

| Decision                                                                                         | Why                                                                                                             |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Pages flattened to root URLs (moved files, not config tricks)                                    | Zero extra code; dev URLs match production; done while pages had no inbound links                               |
| Nav links live in `navigation.json`, headings in `homeCopy.json`                                 | Architecture rule: UI originates from data only; keeps future language toggle trivial                           |
| Trust-strip/philosophy copy drafted only from `bio.json` facts                                   | User instruction: no invented marketing claims; all drafts flagged for review                                   |
| Featured service = Professional Lash Courses (`service8`)                                        | User's pick: it's the differentiator and targets a second audience (students)                                   |
| Achievements slider + contact CTA kept and restyled                                              | User's pick: competition wins are real trust content                                                            |
| Slider has autoplay, stops on manual interaction                                                 | User's pick over manual-only                                                                                    |
| Services preview shows top 6 by `order` + browse-all link                                        | Layout doc: "top N according to order field"; full list belongs to services page                                |
| Missing media refs are skipped, never fatal                                                      | `media.json` is incomplete by design right now; pages must render without photos                                |
| Cormorant Garamond + Jost via Google Fonts                                                       | Brief demanded serif display + non-Inter sans; matches reference's elegant mood                                 |
| CSS `:has()` used for image-less card / featured layout variants                                 | Keeps renderers free of layout logic; fine for modern browsers                                                  |
| Service detail uses native `<dialog>` + `showModal()`                                            | Free focus trap, Escape-to-close, and `::backdrop`; backdrop-click-to-close added manually via a geometry check |
| "Book now" in the detail dialog scrolls to the booking row instead of holding its own deep links | Layout doc constraint: detail view must not include booking actions itself                                      |

## Next steps (suggested order)

1. Plan and build the **about page** (longBio, achievements, salon gallery) — see `Documentation/About Us Page Layout.md`.
2. Build the **contact page** (form UI + a form backend such as a mail handler, plus the Maps embed).
3. Review/edit drafted copy in `trustHighlights.json`, `homeCopy.json`, and `servicesCopy.json`.
4. Add real photos/videos to `public/media/` and complete `media.json` entries.
