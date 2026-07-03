# Home Page Layout

### **HOME PAGE LAYOUT**

## **1. Hero Section**

- Purpose: Introduce the business & owner and communicate the core identity of the salon.
- Consumes data from: BusinessIdentityModel, mediaModel
- Displays: Brand Name, Brand Slogan, Hero Text, Hero Image
- Required fields: heroImage(id), heroText, brandName, brandSlogan
- Interactions: N/A
- Constraints: Must display only one hero image and must remain independent with service and achievement data

## **2. Main CTA Section**

- Purpose: Provide direct access to booking/contact actions.
- Consumes data from: ContactInformationModel
- Displays: Call action, WhatsApp action, Instagram action, Facebook action, directions link(Maps)
- Interactions: click/tap link → trigger deep link
- Constraints: All deep links must be valid in accordance with data from ContactInformationModel

## **3. Achievements Preview Section**

- Purpose: Build trust by showing a selection of achievements
- Consumes data from: AchievementModel, mediaModel
- Displays: associated media (thumbnail), achievement title, date, category
- Selection logic (which achievements show): Show top achievements sorted according to “order” field
- Interactions: User can browse different achievements
- Constraints: Must use only AchievementModel fields, no computed “best” logic. If specified in the UI design, may include autoplay navigation.

## **4. Services Preview Section**

- Purpose: Provide a quick overview of key services and guide the user toward the full Services page.
- Consumes data from: ServiceModel, mediaModel
- Displays: Service Title, Service Thumbnail, “Browse All Services” link
- Selection logic: Show top N services according to “order” field
- Interactions: click/tap card opens the selected Service’s page.
- Constraints: Service preview cards must not contain booking actions

## **5. Footer Section**

- Purpose: Provide essential business information and navigation anchors
- Consumes data from: BusinessIdentityModel, ContactInformationModel
- Displays: Business name, address, social links, copyright text
- Interactions: Open social links and contact methods
- Constraints: Must not contain dynamic content (except updated contact info)
