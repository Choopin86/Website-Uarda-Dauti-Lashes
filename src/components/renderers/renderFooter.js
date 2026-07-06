export function renderFooter(footerUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "footer-content";

  const brandName = document.createElement("h3");
  brandName.className = "footer-brand";
  brandName.textContent = footerUI.content.brandName;

  const address = document.createElement("p");
  address.className = "footer-address";
  address.textContent = footerUI.content.address;

  const phone = document.createElement("p");
  phone.className = "footer-phone";
  phone.textContent = footerUI.content.phone;

  const email = document.createElement("p");
  email.className = "footer-email";
  email.textContent = footerUI.content.email;

  const openingHours = document.createElement("p");
  openingHours.className = "footer-hours";
  openingHours.textContent = footerUI.content.openingHours;

  const socialLinks = document.createElement("div");
  socialLinks.className = "footer-social";

  footerUI.content.socialLinks.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    const icon = document.createElement("i");
    icon.className = link.icon;
    anchor.appendChild(icon);
    socialLinks.appendChild(anchor);
  });

  const copyright = document.createElement("p");
  copyright.className = "footer-copyright";
  copyright.textContent = footerUI.content.copyright;

  //Assemble
  wrapper.append(brandName, address, phone, email, openingHours, socialLinks);
  container.append(wrapper, copyright);
}
