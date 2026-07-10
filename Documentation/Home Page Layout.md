# Home Page Layout

_Revised to match the implemented build (see PROGRESS.md, commit `97e01b0`). Supersedes the earlier draft, which reflected an earlier plan rather than the final structure._

## Design rationale for section order

The sequence below follows a deliberate persuasion arc rather than a checklist of "things to include":

**Identity → Credibility → Signature offer → Breadth → Proof → Trust (human) → Action → Utility**

A visitor shouldn't be asked to act (call, book, message) until they've been given a reason to. Trust signals alone don't sell a booking — seeing the actual offer does. So the CTA block is pushed to just before the footer, once the visitor has seen the hero, a fast trust signal, the flagship service, the full service range, real achievements, and the person behind the business. This also avoids the redundancy of two CTA-shaped blocks competing early and late in the page.

---

## 1. Header / Navigation

- Purpose: Persistent wayfinding and brand presence across the page.
- Consumes data from: BusinessIdentityModel, NavigationModel
- Displays: Logo/brand name, nav links, language toggle (al/en)
- Interactions: click nav link → scroll/route to section or page; click language toggle → switch active language and persist the choice
- Constraints: Nav source of truth is `navigation.json` only — no hardcoded links in markup; the language toggle lives here only, not in the footer

## 2. Hero Section

- Purpose: Introduce the business & owner and communicate the core identity of the salon.
- Consumes data from: BusinessIdentityModel, mediaModel
- Displays: Brand name, brand slogan, hero text, hero image
- Required fields: `heroImage(id)`, `heroText`, `brandName`, `brandSlogan`
- Interactions: N/A
- Constraints: Exactly one hero image; must remain independent of service and achievement data

## 3. Trust Strip Section

- Purpose: Deliver an immediate, low-effort credibility signal directly beneath the hero, before asking for any deeper engagement.
- Consumes data from: TrustHighlightModel
- Displays: icon, label — for each visible highlight
- Selection logic: show highlights where `visibility` is true, sorted by `order`
- Interactions: N/A
- Constraints: TrustHighlightModel fields only, no computed "best" logic; copy must be drawn from real business facts, never invented marketing claims

## 4. Featured Service Section

- Purpose: Give the single strongest offer a dedicated, high-attention moment rather than letting it compete as one card among many.
- Consumes data from: ServiceModel, mediaModel
- Displays: Service title, description, media, single clear link through to the service's detail view
- Selection logic: **manually curated, not computed.** Currently `service8` — Professional Lash Courses.
- **Why this one, deliberately:** it represents the business's highest tier of service and expertise, and it speaks to a second audience entirely — aspiring lash technicians, not just clients booking a treatment. A pure "top-by-order" or "most popular" rule would bury this, since it isn't the highest-volume service; it's the highest-_ceiling_ one. Featuring it here does double duty: it signals mastery to prospective clients and opens a distinct acquisition channel (students) that the rest of the page doesn't address.
- Constraints: This section's selection is intentionally exempt from `order`-based or computed logic — document any future change to the featured pick with its own stated reason, the same way this one is, so the choice doesn't quietly drift back to an automated rule.

## 5. Services Preview Section

- Purpose: Show the breadth of offerings and route interested visitors to the full catalogue.
- Consumes data from: ServiceModel, mediaModel
- Displays: Service title, thumbnail, price, category, "Book Now" action, "Browse All Services" link
- Selection logic: top N services by `order`
- Interactions: click/tap card → opens that service's page; "Book Now" → deep link to the booking channel (`contactInformation["book-link"]`)
- Constraints: missing media must degrade to the no-photo card style, never break the layout

## 6. Achievements Section

- Purpose: Build trust through concrete, third-party-validated proof (awards, competition results) after the visitor already knows what's on offer.
- Consumes data from: AchievementModel, mediaModel
- Displays: associated media (thumbnail), achievement title, date, category
- Selection logic: top achievements by `order`
- Interactions: slider — prev/next controls, autoplay (~5s), autoplay stops on manual interaction
- Constraints: AchievementModel fields only, no computed "best" logic

## 7. About Section

- Purpose: Put a person behind the credentials — humanize the business right before asking the visitor to reach out.
- Consumes data from: BusinessIdentityModel (bio), mediaModel
- Displays: Owner bio/story, relevant photo(s)
- Interactions: N/A
- Constraints: sourced only from real bio facts (`bio.json`), no invented narrative

## 8. Contact CTA Section

- Purpose: Convert an already-warmed visitor into a booking or inquiry — this is the page's primary action moment, held back until credibility, offer, and proof have all been established.
- Consumes data from: ContactInformationModel
- Displays: Call action, email action, WhatsApp action, Instagram action, TikTok action, directions link (Maps), opening hours
- Interactions: click/tap → deep link (`tel:`, `wa.me`, social profile URLs, Maps)
- Constraints: all deep links must validate against `contactInformation.json`; this is the only section carrying the full deep-link set — earlier sections should not duplicate it

## 9. Footer Section

- Purpose: Provide essential business information and navigation anchors after the main persuasion arc is complete.
- Consumes data from: BusinessIdentityModel, ContactInformationModel
- Displays: Business name, address, social links, copyright text
- Interactions: open social links and contact methods
- Constraints: no dynamic content beyond contact info; the language toggle is not duplicated here — it lives only in the header (Section 1)

---

## Module Map

Which `transformX`/`renderX` pairs are exclusive to this page vs. shared with other page orchestrators (currently just `src/components/home.js` and `src/components/services.js`). Re-derive this by checking those two files' imports if pages are added later — don't assume it stays accurate on its own.

**Exclusive to Home** — free to change without checking other pages:
- `transformHero` / `renderHero`
- `transformTrust` / `renderTrust`
- `transformFeaturedService` / `renderFeaturedService`
- `transformServicesPreview` / `renderServices` (renderer is named `renderServices`, not `renderServicesPreview`)
- `transformAchievements` / `renderAchievements`
- `transformAbout` / `renderAbout`
- `transformCTA` / `renderCTA`

**Shared with other pages** — check every importing page before changing output shape:
- `transformHeader` / `renderHeader` — also used by `services.js`
- `transformFooter` / `renderFooter` — also used by `services.js`
- `transformServices.js` — not imported directly by any page orchestrator; it's a shared low-level helper called internally by both `transformServicesPreview.js` (Home) and `transformServicesList.js` (Services page)
