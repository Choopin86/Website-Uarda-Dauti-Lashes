export function renderBookingCTA(bookingCtaUI, container) {
  // Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "cta-social";

  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${bookingCtaUI.content.phone.replace(/\s/g, "")}`;
  const phoneIcon = document.createElement("i");
  phoneIcon.className = "fa-solid fa-phone";
  phoneLink.appendChild(phoneIcon);
  wrapper.appendChild(phoneLink);

  [
    bookingCtaUI.content.whatsapp,
    bookingCtaUI.content.instagram,
    bookingCtaUI.content.tiktok,
  ]
    .filter(Boolean)
    .forEach((social) => {
      const anchor = document.createElement("a");
      anchor.href = social.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      const icon = document.createElement("i");
      icon.className = social.icon;
      anchor.appendChild(icon);
      wrapper.appendChild(anchor);
    });

  container.appendChild(wrapper);
}
