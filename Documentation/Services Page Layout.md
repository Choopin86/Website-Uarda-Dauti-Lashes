# Services Page Layout

## 1. Page Header Section

- Purpose: Introduce the services provided by the salon.
- Consumes data from: BusinessIdentityModel, MediaModel
- Displays: Services introduction text, cover image
- Interactions: None
- Constraints: Must not include any link or button — this section is purely introductory, not a second nav

---

## 2. Services List Section

- Purpose: Present a complete list of all available services.
- Consumes data from: ServiceModel, MediaModel, ContactInformationModel
- Displays: Service title, shortDescription, duration, price, thumbnail, category, a "Book now" button
- Selection logic: order by `order` field (ascending); display only where `visibility = true`
- Interactions:
  - Selecting the card (anywhere outside the "Book now" button) opens the Services Detailed View for that service
  - The "Book now" button opens the business's Instagram DM thread directly (`contactInformation.json`'s `book-link`) in a new tab — it does not open the Detailed View or the Booking CTA Section (4); click/keydown propagation is stopped so it doesn't also trigger card selection
- Constraints:
  - Must only display media referenced by that specific service's `mediaRefs`
  - If a service has no media reference resolved yet, the card renders with **no photo** — this is not a fallback/degraded state, it's the correct rendering for a service that genuinely has no photo yet. No placeholder image, no "coming soon" graphic. As soon as `media.json` gains a real entry for that service, the card should pick it up automatically with no other code change.
  - The full service list is stable — the number of services doesn't change day to day, only prices do. No pagination, "load more," or category grouping is needed; render the full list at once.

---

## 3. Services Detailed View (dialog)

- Purpose: Present detailed information about a single service.
- Consumes data from: ServiceModel, MediaModel, ContactInformationModel
- Displays: service title, description, duration, price, policies, video description, images of final result (all `mediaRefs`), a "Book now" button
- Interactions:
  - Opens when a Services List card is selected (anywhere outside that card's own "Book now" button)
  - Closes via explicit close control (✕), tap/click outside the dialog, and Escape key
  - The "Book now" button opens the business's Instagram DM thread directly (`contactInformation.json`'s `book-link`), the same action and destination as the Services List card's "Book now" button — it is a shortcut to the same booking channel, not the general Booking CTA Section (4)
- Constraints:
  - Renders as a component, driven entirely by ServiceModel + MediaModel for the selected service
  - Must display only media referenced by that service's `mediaRefs`
  - Must not modify any global state
  - Only one dialog instance visible at a time

---

## 4. Booking CTA Section

- Purpose: General-purpose booking prompt at the end of the page — not scoped to whichever service the user last viewed. Service-specific booking is handled by the "Book now" button on each Services List card and inside the Detailed View (Sections 2 and 3).
- Consumes data from: ContactInformationModel
- Displays: full icon set — phone (tel:), WhatsApp, Instagram, TikTok — same set used on the homepage/footer
- Interactions: tapping an icon opens the corresponding deep link (call, WhatsApp chat, Instagram profile, TikTok profile)
- Constraints:
  - Deep links resolve from `contactInformation.json`
  - Positioned at the end of the page, immediately before the Footer section
  - Icons only, no heading/copy

---

## 5. Footer Section

- Purpose: Provide essential business information and navigation anchors.
- Consumes data from: BusinessIdentityModel, ContactInformationModel
- Displays: Business name, address, social links, copyright
- Interactions: social links and contact actions open external destinations
- Constraints: no dynamic content beyond contact info; language toggle is not placed here — it lives only in the header, consistent with the homepage

---

## Module Map

Which `transformX`/`renderX` pairs are exclusive to this page vs. shared with other page orchestrators (currently just `src/components/home.js` and `src/components/services.js`). Re-derive this by checking those two files' imports if pages are added later — don't assume it stays accurate on its own.

**Exclusive to Services** — free to change without checking other pages:
- `transformServicesIntro` / `renderServicesIntro`
- `transformServicesList` / `renderServicesList`
- `transformServiceDetail` / `renderServiceDetail`
- `transformBookingCTA` / `renderBookingCTA`

**Shared with other pages** — check every importing page before changing output shape:
- `transformHeader` / `renderHeader` — also used by `home.js`
- `transformFooter` / `renderFooter` — also used by `home.js`
- `transformServices.js` — not imported directly by any page orchestrator; it's a shared low-level helper called internally by both `transformServicesList.js` (Services page) and `transformServicesPreview.js` (Home)
