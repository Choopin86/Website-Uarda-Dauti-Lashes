import businessIdentity from "../data/businessIdentity.json";
import contactInformation from "../data/contactInformation.json";
import media from "../data/media.json";
import navigation from "../data/navigation.json";
import services from "../data/services.json";
import servicesCopy from "../data/servicesCopy.json";

import { transformHeader } from "./transformations/transformHeader.js";
import { renderHeader } from "./renderers/renderHeader.js";
import { transformServicesIntro } from "./transformations/transformServicesIntro.js";
import { renderServicesIntro } from "./renderers/renderServicesIntro.js";
import { transformServicesList } from "./transformations/transformServicesList.js";
import { renderServicesList } from "./renderers/renderServicesList.js";
import { transformServiceDetail } from "./transformations/transformServiceDetail.js";
import { renderServiceDetail } from "./renderers/renderServiceDetail.js";
import { transformBookingCTA } from "./transformations/transformBookingCTA.js";
import { renderBookingCTA } from "./renderers/renderBookingCTA.js";
import { transformFooter } from "./transformations/transformFooter.js";
import { renderFooter } from "./renderers/renderFooter.js";
import { getLanguage, toggleLanguage } from "../utils/language.js";

export function initServices() {
  const language = getLanguage();
  const headerContainer = document.querySelector(".header");
  const servicesIntroContainer = document.querySelector(".services-intro");
  const servicesListContainer = document.querySelector(".services-list");
  const bookingCtaContainer = document.querySelector(".booking-cta");
  const footerContainer = document.querySelector(".footer");

  //Transform
  const headerUI = transformHeader(navigation, businessIdentity, language);
  const servicesIntroUI = transformServicesIntro(businessIdentity, media, language);
  const servicesListUI = transformServicesList(
    services,
    media,
    servicesCopy.list,
    language,
    contactInformation,
  );
  const bookingCtaUI = transformBookingCTA(contactInformation);
  const footerUI = transformFooter(businessIdentity, contactInformation, language);

  //Render
  renderHeader(headerUI, headerContainer, handleLanguageToggle);
  renderServicesIntro(servicesIntroUI, servicesIntroContainer);
  renderServicesList(servicesListUI, servicesListContainer, (serviceId) =>
    handleSelectService(serviceId, language),
  );
  renderBookingCTA(bookingCtaUI, bookingCtaContainer);
  renderFooter(footerUI, footerContainer);
}

function handleLanguageToggle() {
  toggleLanguage();
  initServices();
}

function handleSelectService(serviceId, language) {
  const dialog = document.querySelector(".detailed-view");
  const detailUI = transformServiceDetail(
    services,
    media,
    servicesCopy.detail,
    language,
    serviceId,
    contactInformation,
  );

  renderServiceDetail(detailUI, dialog);
  bindBackdropClose(dialog);
  dialog.showModal();
}

function bindBackdropClose(dialog) {
  if (dialog._backdropCloseBound) return;
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!clickedInDialog) dialog.close();
  });
  dialog._backdropCloseBound = true;
}
