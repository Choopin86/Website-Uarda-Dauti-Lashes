# Service Page Layout (Ledi)

## **1. Page Header Section**

- **Purpose:** Introduce the services provided by the salon
- **Consumes data from:** BusinessIdentityModel, MediaModel
- **Displays:** Services introduction text, cover image
- **Interactions:** None
- **Constraints:** This section must not include any link or button; no interaction needed

---

## **2. Services List Section**

- **Purpose:** Present a complete list of all available services
- **Consumes data from:** ServiceModel, MediaModel
- **Displays:** Service title, shortDescription, duration, price, thumbnail
- **Selection logic:**
  - Order services by the _order_ field (ascending)
  - Display only services where visibility = true
- **Interactions:** Selecting a service triggers navigation to the Service Detailed View for that specific service
- **Constraints:** Must only display media (thumbnail) referenced by MediaModel for that specific service

---

## **3. Services Detailed View (dialog)**

- **Purpose:** Present detailed information about a single service
- **Consumes data from:** ServiceModel, MediaModel, ContactInformationModel
- **Displays:**
  - service title
  - description
  - duration
  - price
  - policies
  - video description
  - images of final result (all mediaRefs)
- **Interactions:** From the Detailed View, the user can open the Booking CTA Section
- **Constraints:**
  - Must display only media referenced by the service’s mediaRefs
  - Must not include booking actions
  - Must render only data defined in ServiceModel and MediaModel
  - **Must not modify global state**
- **Services Detailed Dialog** → now a **component**, rendered dynamically from ServiceModel + MediaModel.
- Interactions: Clicking a service card triggers the dialog.
- Constraints: Must not break page flow; only one dialog visible at a time.

---

## **4. Booking CTA Section**

- **Purpose:** Provide the option to book an appointment for a specific service
- **Consumes data from:** ServiceModel, ContactInformationModel
- **Displays:** Phone icon, WhatsApp icon, Instagram icon, Facebook icon
- **Interactions:** Clicking/tapping an icon triggers the corresponding deep link
- **Constraints:** Each icon must trigger a valid deep-link URL and allow the OS to decide whether to open an app or a browser

---

## **5. Footer Section**

- **Purpose:** Provide essential business information and navigation anchors
- **Consumes data from:** BusinessIdentityModel, ContactInformationModel
- **Displays:** Business name, address, social links, copyright
- **Interactions:** Social links and contact actions open external destinations
- **Constraints:** Must not contain dynamic content (except updated contact info)
