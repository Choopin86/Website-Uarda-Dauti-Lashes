export function renderContactInformation(contactInformationUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "contact-information-content";

  const eyebrow = document.createElement("p");
  eyebrow.className = "section-eyebrow";
  eyebrow.textContent = contactInformationUI.content.eyebrow;

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = contactInformationUI.content.title;

  const details = document.createElement("div");
  details.className = "contact-information-details";

  //Phone row
  const phoneRow = document.createElement("div");
  phoneRow.className = "contact-information-row contact-information-phone";
  const phoneIconWrap = document.createElement("span");
  phoneIconWrap.className = "contact-information-icon";
  const phoneIcon = document.createElement("i");
  phoneIcon.className = "fa-solid fa-phone";
  phoneIconWrap.appendChild(phoneIcon);
  const phoneLink = document.createElement("a");
  phoneLink.className = "contact-information-link";
  phoneLink.href = contactInformationUI.content.phone.href;
  phoneLink.append(
    phoneIconWrap,
    document.createTextNode(contactInformationUI.content.phone.display),
  );
  phoneRow.append(phoneLink);

  //Email row
  const emailRow = document.createElement("div");
  emailRow.className = "contact-information-row contact-information-email";
  const emailIconWrap = document.createElement("span");
  emailIconWrap.className = "contact-information-icon";
  const emailIcon = document.createElement("i");
  emailIcon.className = "fa-solid fa-envelope";
  emailIconWrap.appendChild(emailIcon);
  const emailLink = document.createElement("a");
  emailLink.className = "contact-information-link";
  emailLink.href = contactInformationUI.content.email.href;
  emailLink.append(
    emailIconWrap,
    document.createTextNode(contactInformationUI.content.email.display),
  );
  emailRow.append(emailLink);

  //Address row (plain text, no external link — Map section owns navigation)
  const addressRow = document.createElement("div");
  addressRow.className = "contact-information-row contact-information-address";
  const addressIconWrap = document.createElement("span");
  addressIconWrap.className = "contact-information-icon";
  const addressIcon = document.createElement("i");
  addressIcon.className = "fa-solid fa-location-dot";
  addressIconWrap.appendChild(addressIcon);
  const addressText = document.createElement("p");
  addressText.className = "contact-information-text";
  addressText.textContent = contactInformationUI.content.address;
  addressRow.append(addressIconWrap, addressText);

  //Opening hours row (plain text)
  const hoursRow = document.createElement("div");
  hoursRow.className = "contact-information-row contact-information-hours";
  const hoursIconWrap = document.createElement("span");
  hoursIconWrap.className = "contact-information-icon";
  const hoursIcon = document.createElement("i");
  hoursIcon.className = "fa-solid fa-clock";
  hoursIconWrap.appendChild(hoursIcon);
  const hoursText = document.createElement("p");
  hoursText.className = "contact-information-text";
  hoursText.textContent = contactInformationUI.content.openingHours;
  hoursRow.append(hoursIconWrap, hoursText);

  details.append(phoneRow, emailRow, addressRow, hoursRow);

  //Social links row
  const social = document.createElement("div");
  social.className = "contact-information-social";

  contactInformationUI.content.socialLinks.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.className = "contact-information-social-link";
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    const icon = document.createElement("i");
    icon.className = link.icon;
    anchor.appendChild(icon);
    social.appendChild(anchor);
  });

  //Assemble
  wrapper.append(eyebrow, title, details, social);
  container.appendChild(wrapper);
}
