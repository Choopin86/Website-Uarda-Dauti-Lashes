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
- Consumes data from: ServiceModel, MediaModel
- Displays: Service title, shortDescription, duration, price, thumbnail
- Selection logic: order by `order` field (ascending); display only where `visibility = true`
- Interactions: selecting a service opens the Services Detailed View for that service
- Constraints:
  - Must only display media referenced by that specific service's `mediaRefs`
  - If a service has no media reference resolved yet, the card renders with **no photo** — this is not a fallback/degraded state, it's the correct rendering for a service that genuinely has no photo yet. No placeholder image, no "coming soon" graphic. As soon as `media.json` gains a real entry for that service, the card should pick it up automatically with no other code change.
  - The full service list is stable — the number of services doesn't change day to day, only prices do. No pagination, "load more," or category grouping is needed; render the full list at once.

---

## 3. Services Detailed View (dialog)

- Purpose: Present detailed information about a single service.
- Consumes data from: ServiceModel, MediaModel
- Displays: service title, description, duration, price, policies, video description, images of final result (all `mediaRefs`)
- Interactions:
  - Opens when a Services List card is selected
  - Closes via explicit close control (✕), tap/click outside the dialog, and Escape key
  - From within the dialog, the user can open the Booking CTA Section for this service
- Constraints:
  - Renders as a component, driven entirely by ServiceModel + MediaModel for the selected service
  - Must display only media referenced by that service's `mediaRefs`
  - Must not include booking actions directly — booking lives in its own section (4)
  - Must not modify any global state
  - Only one dialog instance visible at a time

---

## 4. Booking CTA Section

- Purpose: Let the user act on the specific service they were just viewing, not a generic "contact us."
- Consumes data from: ServiceModel (for the currently open service), ContactInformationModel
- Displays: Instagram action (per owner's request — this is the sole booking channel here, not the full icon set used on the homepage/footer)
- Interactions: tapping the Instagram action opens a direct message thread with the business's Instagram account
- Constraints:
  - The deep link must resolve to the business's Instagram profile/DM thread from `contactInformation.json`
  - **Known platform limitation:** Instagram does not support pre-filling DM text via deep link (unlike WhatsApp's `?text=`). The service name therefore cannot be auto-inserted into the message. To preserve context without that: display the service title as visible text right next to the Instagram action (e.g. "Message us about [Service Title]"), so the user can reference it themselves once the DM thread opens.
  - This section is scoped to a single service at a time — it is not a substitute for the general Contact CTA / footer social links elsewhere on the site

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
- `transformServicesList` / `renderServicesList`
- `transformServiceDetail` / `renderServiceDetail`
- `transformBookingCTA` / `renderBookingCTA`

**Shared with other pages** — check every importing page before changing output shape:
- `transformHeader` / `renderHeader` — also used by `home.js`
- `transformFooter` / `renderFooter` — also used by `home.js`
- `transformServices.js` — not imported directly by any page orchestrator; it's a shared low-level helper called internally by both `transformServicesList.js` (Services page) and `transformServicesPreview.js` (Home)
