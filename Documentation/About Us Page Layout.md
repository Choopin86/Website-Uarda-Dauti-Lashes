# About Us

# **ABOUT US — STRUCTURAL BLOCK TEMPLATE**

## **1. Page Header Section**

- **Purpose: Introduce the Business brand**
- **Consumes data from: BusinessIdentityModel, MediaModel**
- **Displays: brand name, brand slogan, hero image**
- **Interactions: n/a**
- **Constraints: “This section must remain static; no CTA or navigational behavior is allowed.**

---

## **2. Business Story Section**

- **Purpose: Introduce a short owner’s biography**
- **Consumes data from: BiographyModel, MediaModel**
- **Displays: shortBio, portraitMediaId**
- **Interactions: The user can expand to view longBio**
- **Constraints:**
  - **Must not contain booking actions.**
  - Must not link to external pages
  - Must only display fields defined in BiographyModel and MediaModel

---

## **3. Achievements Section**

- **Purpose: Introduce achievements**
- **Consumes data from: AchievementModel**
- **Displays: achievements**
- **Selection logic: by order**
- **Constraints: Section must not contain any external links or navigation outside the site.**

---

## **4. Footer Section**

---

- **Purpose:** Provide essential business information and navigation anchors
- **Consumes data from:** BusinessIdentityModel, ContactInformationModel
- **Displays:** Business name, address, social links, copyright
- **Interactions:** Social links and contact actions open external destinations
- **Constraints:** Must not contain dynamic content (except updated contact info)
