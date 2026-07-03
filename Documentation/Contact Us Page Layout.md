# **CONTACT PAGE LAYOUT**

## **1. Page Header Section**

- **Purpose: Introduce the contact option**
- **Consumes data from: n/a**
- **Displays:**
  - **Introduction to the contact feature**
  - **Brief description of how clients can reach out**
- **Interactions: n/a**
- **Constraints: Content must be static**

---

## **2. Contact Information Section**

- **Purpose: Provide contact information**
- **Consumes data from: ContactInformationModel**
- **Displays: phone, email, address, opening hours, socialLinks**
- **Interactions: deep links**
- **Constraints: must not duplicate form behavior**

---

## **3. Contact Form Section**

- **Purpose: Provide the Contact Form**
- **Consumes data from: FormModel**
- **Displays: Full Name field, Email Address field, Full Address field, Tel Number field, Message field**
- **Interactions: User submits data which triggers a form submission workflow (validation → submission → status update)**
- **Constraints:**
  - **Must not trigger external navigation**
  - **Each entry must be assigned metadata ID, submittedAt, status, hasConsentedToContact**
  - **Consent is required to submit**
  - **Form must not allow submission without required fields**
  - **FormModel status begins as “pending”**

---

## **4. Map Section**

- **Purpose: Provide GPS location of the salon**
- **Consumes data from: ContactInformationModel**
- **Displays: Map embed centered at GPS coordinates defined in ContactInformationModel, with location marker.**
- **Interactions: User can pan, zoom, or open external map provider for navigation.**
- **Constraints: Map must be generated using an external map provider based on the GPS field from ContactInformationModel.**

---

## **5. Footer Section**

- **Purpose: Provide essential business information and navigation anchors**
- **Consumes data from: BusinessIdentityModel, ContactInformationModel**
- **Displays: Business name, address, social links, copyright**
- **Interactions: SocialLinks open external destinations. Phone and email links trigger system-level handlers.**
- **Constraints: Must not contain dynamic content (except updated contact info)**
