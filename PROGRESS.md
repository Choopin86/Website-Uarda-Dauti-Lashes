# Progress — Uarda Dauti Lashes Website

_Last updated: 2026-07-21_

## Current state

Homepage and services page are built, run the full JSON → transform → render pipeline, and are verified in-browser (no console errors, production build passes). Live at `www.uardadautilashes.com`. `contact.html` is an HTML skeleton. `about.html`'s structural build and styling pass are both complete and verified in-browser in both languages, including mobile widths (900px grid-collapse breakpoint added to Page Header/Business Story; Achievements section given its own dark-background/title-color treatment scoped to `.achievements-section`).

## Done

- Homepage — all 9 sections wired and verified.
- Services page — all 5 sections wired and verified (intro banner, full services list, detail dialog, booking CTA row, footer). Both "Book now" buttons (service card and detail dialog) open the Instagram DM link (`contactInformation.json`'s `book-link`) directly. The bottom Booking CTA section is the full icon set (phone/WhatsApp/Instagram/TikTok), general-purpose, not scoped to a service. `Documentation/Services Page Layout.md` is up to date with this behavior.
- Deployed to Vercel at the custom domain.
- Language toggle — implemented in `src/utils/language.js`, wired into both `home.js` and `services.js`; all data is already bilingual.
- About page — structural build complete: Page Header, Business Story (Bio), Achievements (reused from homepage), shared Header/Footer orchestrator wiring. Verified in both languages, no console errors. Salon Environment section was dropped per client decision (removed from doc, markup, and progress notes — no src code had been written for it).
- About page styling — complete. Page Header (`.about-header`) and Business Story (`.business-story`/`.portrait-container`/`.bio-container`) sections: circular portrait frames (new `--radius-circle` token), side-by-side grid layouts with a portrait-first column order (owner's deliberate choice, differs from the homepage hero's text-first order), full-bleed section backgrounds with a centered inner content wrapper (matching the `.trust-strip`/`.trust-items` pattern). New files: `src/styles/sections/about-header.css`, `business-story.css`. Achievements section (`.achievements-section`, reusing homepage's `renderAchievements`) got its own dark-background/padding and `.section-title`/`.section-sub` color overrides added to the existing `achievements.css`, mirroring the homepage's `.achievements-preview` treatment — no new file needed since the inner slider styles are already unscoped and shared. Both grid sections also got a `900px` mobile breakpoint (collapses to one column, caps portrait width at 320px) since they were the only two-column grid sections in the codebase missing one; verified in-browser at 1280px/900px/375px/320px and in both languages.

## Pending (suggested order)

1. **Contact page** — form UI + backend (site is static, needs a mail handler) + Maps embed.
2. **Copy review (owner)** — drafted copy lives in `src/data/trustHighlights.json`, `homeCopy.json`, `servicesCopy.json`, and `businessIdentity.json`'s `servicesIntroText`. Edit those JSON files directly.
3. **Media assets** — `media.json` references `media1`–`media16` but only a few have real files; add photos/videos to `public/media/` to light up remaining cards. (`portrait.jpeg` was added earlier for the About page's bio/header images.)
4. **Real-device mobile check** — ongoing; owner is checking the live site on their own smartphone regularly.
5. **Business Story "expand to view longBio" interaction** — `Documentation/About Us Page Layout.md` section 2 specifies this, but it hasn't been confirmed as implemented; worth checking `renderAboutBio.js`/`bio.json` before considering the About page fully done against spec.

## Non-obvious decisions worth knowing

- Featured homepage service is Professional Lash Courses (`service8`) — deliberate pick, it's the differentiator and targets a second audience (students).
- Missing `media.json` refs are skipped, never fatal — intentional (data is incomplete by design right now), not a bug to "fix" by adding fallback images.
- Copy in the JSON files listed under Pending #3 was Claude-drafted from `bio.json` facts only (no invented marketing claims) and still needs owner sign-off.
- About page's structural build was deliberately finished before any styling — owner's call, to keep the JSON→transform→render build separate from the CSS pass. (The About page was originally built with Claude guiding step-by-step and the owner writing the code, as a learning exercise; that workflow has since ended — Claude now writes code directly like on the rest of the site.)
- Full-bleed section backgrounds require the `max-width`/`margin: 0 auto` centering to live on a separate inner wrapper, never on the same element as the section's `background-color` — otherwise the background gets clipped to the centered content width. Found and fixed on both `.about-header` and `.business-story` this session; worth checking for on any new section.
- Renderers must assign a `className` to every element they create (even plain text nodes like bio paragraphs) — `renderAboutHeader.js` and `renderAboutBio.js` were missing this and had to be retrofitted; every other renderer (e.g. `renderHero.js`, `renderTrust.js`) already follows this convention.
