# Progress — Uarda Dauti Lashes Website

_Last updated: 2026-07-17_

## Current state

Homepage and services page are built, run the full JSON → transform → render pipeline, and are verified in-browser (no console errors, production build passes). Live at `www.uardadautilashes.com`. `contact.html` is an HTML skeleton. `about.html`'s structural build is complete. Its styling pass is in progress: Page Header and Business Story sections are now styled and verified; Achievements section styling is next.

## Done

- Homepage — all 9 sections wired and verified.
- Services page — all 5 sections wired and verified (intro banner, full services list, detail dialog, booking CTA row, footer). Both "Book now" buttons (service card and detail dialog) open the Instagram DM link (`contactInformation.json`'s `book-link`) directly. The bottom Booking CTA section is the full icon set (phone/WhatsApp/Instagram/TikTok), general-purpose, not scoped to a service. `Documentation/Services Page Layout.md` is up to date with this behavior.
- Deployed to Vercel at the custom domain.
- Language toggle — implemented in `src/utils/language.js`, wired into both `home.js` and `services.js`; all data is already bilingual.
- About page — structural build complete: Page Header, Business Story (Bio), Achievements (reused from homepage), shared Header/Footer orchestrator wiring. Verified in both languages, no console errors. Salon Environment section was dropped per client decision (removed from doc, markup, and progress notes — no src code had been written for it).
- About page styling — Page Header (`.about-header`) and Business Story (`.business-story`/`.portrait-container`/`.bio-container`) sections are styled: circular portrait frames (new `--radius-circle` token), side-by-side grid layouts with a portrait-first column order (owner's deliberate choice, differs from the homepage hero's text-first order), full-bleed section backgrounds with a centered inner content wrapper (matching the `.trust-strip`/`.trust-items` pattern). New files: `src/styles/sections/about-header.css`, `business-story.css`.

## Pending (suggested order)

1. **About page styling — remaining** — `.achievements-section` still needs its container background/padding and `.section-title`/`.section-sub` color overrides (most inner achievement styles are already unscoped in `achievements.css` and apply automatically). Then a final in-browser check of the whole page in both languages.
2. **Contact page** — form UI + backend (site is static, needs a mail handler) + Maps embed.
3. **Copy review (owner)** — drafted copy lives in `src/data/trustHighlights.json`, `homeCopy.json`, `servicesCopy.json`, and `businessIdentity.json`'s `servicesIntroText`. Edit those JSON files directly.
4. **Media assets** — `media.json` references `media1`–`media16` but only a few have real files; add photos/videos to `public/media/` to light up remaining cards. (`portrait.jpeg` was added this session for the About page's bio/header images.)
5. **Real-device mobile check** — ongoing; owner is checking the live site on their own smartphone regularly.

## Non-obvious decisions worth knowing

- Featured homepage service is Professional Lash Courses (`service8`) — deliberate pick, it's the differentiator and targets a second audience (students).
- Missing `media.json` refs are skipped, never fatal — intentional (data is incomplete by design right now), not a bug to "fix" by adding fallback images.
- Copy in the JSON files listed under Pending #3 was Claude-drafted from `bio.json` facts only (no invented marketing claims) and still needs owner sign-off.
- About page's structural build was deliberately finished before any styling — owner's call, to keep the JSON→transform→render learning exercise separate from the CSS pass.
- Full-bleed section backgrounds require the `max-width`/`margin: 0 auto` centering to live on a separate inner wrapper, never on the same element as the section's `background-color` — otherwise the background gets clipped to the centered content width. Found and fixed on both `.about-header` and `.business-story` this session; worth checking for on any new section.
- Renderers must assign a `className` to every element they create (even plain text nodes like bio paragraphs) — `renderAboutHeader.js` and `renderAboutBio.js` were missing this and had to be retrofitted; every other renderer (e.g. `renderHero.js`, `renderTrust.js`) already follows this convention.
