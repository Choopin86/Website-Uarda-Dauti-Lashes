export function renderCTA(ctaUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "cta-content";

  const phone = document.createElement("h3");
  phone.textContent = ctaUI.content.phone;

  const email = document.createElement("h3");
  email.textContent = ctaUI.content.email;

  const address = document.createElement("p");
  address.textContent = ctaUI.content.address;

  const instagramLink = document.createElement("a");
  instagramLink.href = ctaUI.content.instagram.url;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
  const instagramIcon = document.createElement("i");
  instagramIcon.className = ctaUI.content.instagram.icon;
  instagramLink.appendChild(instagramIcon);

  const whatsappLink = document.createElement("a");
  whatsappLink.href = ctaUI.content.whatsapp.url;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  const whatsappIcon = document.createElement("i");
  whatsappIcon.className = ctaUI.content.whatsapp.icon;
  whatsappLink.appendChild(whatsappIcon);

  const tiktokLink = document.createElement("a");
  tiktokLink.href = ctaUI.content.tiktok.url;
  tiktokLink.target = "_blank";
  tiktokLink.rel = "noopener noreferrer";
  const tiktokIcon = document.createElement("i");
  tiktokIcon.className = ctaUI.content.tiktok.icon;
  tiktokLink.appendChild(tiktokIcon);

  //Assemble
  wrapper.append(
    phone,
    email,
    address,
    instagramLink,
    whatsappLink,
    tiktokLink,
  );
  container.append(wrapper);
}
