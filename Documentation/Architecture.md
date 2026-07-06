# Architecture

SECTION A — Application StructureData input

A unified data layer composed of multiple sources (some static, some dynamic), merged into a single predictable structure. Raw data is organized into multiple structured models defined in Section C. Raw data is not accessed by components directly. UI behaviour originates only from the data that is passed to the rendering process.Data will remain immutable in order to provide predictable rendering and update cycles.

Data will remain immutable in order to provide predictable rendering and update cycles.

## Transformation

The raw data will be transformed into UI-ready component structures.
By abstracting element construction, components will be modular, reusable and isolated from the rendering logic.
Downstream functions will never consume raw data, instead they will use only transformed UI-structures.

## Rendering

This layer is responsible only for inserting the UI-structures into the DOM and managing their placement, replacement and removal.
There is no transformation of the UI-structures or business logic. It will determine where and how to place the already created UI-structures in the Interface.

## Updating

On future updates, the system will reconcile the new state with the current UI state.
It will take care of clearing outdated components, rebuilding affected structures using the transformation layer and re-rendering only the needed parts using the rendering layer.
This layer avoids duplication and makes sure that the UI reflects the current raw data/source of truth.

# SECTION B — Page Architecture

## Home Page

**Consumes:**

- BusinessIdentityModel
- ContactInformationModel
- AchievementModel
- MediaModel (hero, gallery)

**Renders:**

- Hero section
- Service gallery preview
- CTA card (book/call/etc.)
- Achievements preview

**Interactions:**

- Social links
- Phone
- Contact form navigation

## Services

**Consumes:**

- serviceModel
- mediaModel
- contactInformationModel

**Renders:**

- Full List of services
- Service Cards
- CTA buttons for each service (global contact info)

**Interactions:**

- contact options (call/WhatsApp/Instagram)

## About

**Consumes:**

- BusinessIdentityModel
- MediaModel
- ContactInformationModel
- BiographyModel

**Renders:**

- About section
- Why choose us section
- Contact form
- Map

**Interactions:**

- Contact form submission
- Social/contact buttons

# SECTION C — DATA MODEL

Purpose of this section: Section C exist to provide stability to the whole system and making the system predictable. It defines the contract of each data model on which every system layer depends on. It performs the duty of translating real-world data into structured, reliable forms.

**ServiceModel:**

- id
- title
- description (full)
- shortDescription (preview)
- price
- mediaRefs → array of images/videos
- duration
- category
- visibility
- order
- policies

**MediaModel:**

- id
- file name
- file format
- file size
- url
- altText
- caption
- type
- portraitMediaId
- belongsToServiceId?: id
- belongsToAchievementId?: id

**BusinessIdentityModel:**

- brand name
- brand slogan
- hero text
- hero image

**ContactInformationModel:**

- phone
- email
- book-link
- address
- GPS
- opening hours
- socialLinks = [
  { platform: "instagram" | "whatsapp" | "facebook", url: string }
  ]

**FormModel:**

- Full Name
- Email Address
- Full Address
- Tel number
- Message
- id
- submittedAt
- status
- hasConsentedToContact (boolean)

**AchievementModel:**

- CompetitionName
- CompetitionCountry
- Organizer
- date
- id
- Prizes won
- mediaRefs → images/videos
- visibility
- order
- description

**BiographyModel:**

- shortBio
- longBio

# SECTION D — ADMIN STRATEGY

1. **Structure:** Data store in individual JSON files per model:

- services.json
- achievements.json
- businessIdentity.json
- contactInformation.json
- media.json
- form.json
- bio.json

1. **Validation**

- User enters/edit data through a UI that validates JSON before use.

# SECTION E — INTERACTION LAYER

**Call Button**

→ Triggers tel: deep link

→ OS handles whether to open phone app

**WhatsApp Button**

→ Triggers https://wa.me/<number> deep link

→ OS or browser opens WhatsApp or fallback webpage

**Instagram Button**

→ Triggers https://instagram.com/<profile> deep link

→ OS or browser chooses app/web version

**Facebook Button**

→ Triggers https://facebook.com/<page> deep link

→ OS or browser chooses app/web version

**Contact Form**

→ Validates input

→ Sends email via backend or external mail handler

→ Produces Form Model output (id, submittedAt, status, etc.)

**Google Maps Embed**

→ Renders iframe

→ Provides external “Open Maps” link (deep link)

→ OS decides whether to open Google Maps app or browser
