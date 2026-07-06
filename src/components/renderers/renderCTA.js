export function renderCTA(ctaUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "cta-content";

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = ctaUI.content.heading;

  const sub = document.createElement("p");
  sub.className = "section-sub";
  sub.textContent = ctaUI.content.sub;

  const details = document.createElement("div");
  details.className = "cta-details";

  const phone = document.createElement("a");
  phone.className = "cta-item";
  phone.href = `tel:${ctaUI.content.phone.replace(/\s/g, "")}`;
  phone.textContent = ctaUI.content.phone;

  const email = document.createElement("a");
  email.className = "cta-item";
  email.href = `mailto:${ctaUI.content.email}`;
  email.textContent = ctaUI.content.email;

  const address = document.createElement("a");
  address.className = "cta-item";
  address.href = ctaUI.content.location;
  address.target = "_blank";
  address.rel = "noopener noreferrer";
  address.textContent = ctaUI.content.address;

  const openingHours = document.createElement("p");
  openingHours.className = "cta-item cta-hours";
  openingHours.textContent = ctaUI.content.openingHours;

  details.append(phone, email, address, openingHours);

  const socialLinks = document.createElement("div");
  socialLinks.className = "cta-social";

  [ctaUI.content.instagram, ctaUI.content.whatsapp, ctaUI.content.tiktok]
    .filter(Boolean)
    .forEach((social) => {
      const anchor = document.createElement("a");
      anchor.href = social.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      const icon = document.createElement("i");
      icon.className = social.icon;
      anchor.appendChild(icon);
      socialLinks.appendChild(anchor);
    });

  //Assemble
  wrapper.append(heading, sub, details, socialLinks);
  container.append(wrapper);
}
