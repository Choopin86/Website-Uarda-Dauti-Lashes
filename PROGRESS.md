# Progress — Uarda Dauti Lashes Website

_Last updated: 2026-07-15_

## Current state

Homepage and services page are built, run the full JSON → transform → render pipeline, and are verified in-browser (no console errors, production build passes). Live at `www.uardadautilashes.com`. `about.html` and `contact.html` are still HTML skeletons — no scripts, no styling, no entry point.

## Done

- Homepage — all 9 sections wired and verified.
- Services page — all 5 sections wired and verified (intro banner, full services list, detail dialog, booking CTA row, footer). Both "Book now" buttons (service card and detail dialog) open the Instagram DM link (`contactInformation.json`'s `book-link`) directly. The bottom Booking CTA section is the full icon set (phone/WhatsApp/Instagram/TikTok), general-purpose, not scoped to a service. `Documentation/Services Page Layout.md` is up to date with this behavior.
- Deployed to Vercel at the custom domain.
- Language toggle — implemented in `src/utils/language.js`, wired into both `home.js` and `services.js`; all data is already bilingual.

## Pending (suggested order)

1. **About page** — see `Documentation/About Us Page Layout.md`.
2. **Contact page** — form UI + backend (site is static, needs a mail handler) + Maps embed.
3. **Copy review (owner)** — drafted copy lives in `src/data/trustHighlights.json`, `homeCopy.json`, `servicesCopy.json`, and `businessIdentity.json`'s `servicesIntroText`. Edit those JSON files directly.
4. **Media assets** — `media.json` references `media1`–`media16` but only a few have real files; add photos/videos to `public/media/` to light up remaining cards.
5. **Real-device mobile check** — ongoing; owner is checking the live site on their own smartphone regularly.

## Non-obvious decisions worth knowing

- Featured homepage service is Professional Lash Courses (`service8`) — deliberate pick, it's the differentiator and targets a second audience (students).
- Missing `media.json` refs are skipped, never fatal — intentional (data is incomplete by design right now), not a bug to "fix" by adding fallback images.
- Copy in the JSON files listed under Pending #3 was Claude-drafted from `bio.json` facts only (no invented marketing claims) and still needs owner sign-off.
