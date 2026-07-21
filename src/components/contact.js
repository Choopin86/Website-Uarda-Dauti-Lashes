import businessIdentity from "../data/businessIdentity.json";
import navigation from "../data/navigation.json";
import contactInformation from "../data/contactInformation.json";
import contactCopy from "../data/contactCopy.json";

import { transformHeader } from "./transformations/transformHeader.js";
import { renderHeader } from "./renderers/renderHeader.js";
import { transformContactInformation } from "./transformations/transformContactInformation.js";
import { renderContactInformation } from "./renderers/renderContactInformation.js";
import { transformContactForm } from "./transformations/transformContactForm.js";
import { renderContactForm } from "./renderers/renderContactForm.js";
import { transformMap } from "./transformations/transformMap.js";
import { renderMap } from "./renderers/renderMap.js";
import { transformFooter } from "./transformations/transformFooter.js";
import { renderFooter } from "./renderers/renderFooter.js";
import { getLanguage, toggleLanguage } from "../utils/language.js";

export function initContact() {
  const language = getLanguage();
  const headerContainer = document.querySelector(".header");
  const contactInformationContainer = document.querySelector(".contact-information");
  const formInstructionsContainer = document.querySelector(".form-instructions");
  const formMessagesContainer = document.querySelector(".form-messages");
  const formContainer = document.querySelector(".contact-form");
  const mapContainer = document.querySelector(".map-container");
  const mapAdditionalContainer = document.querySelector(".map .additional");
  const footerContainer = document.querySelector(".footer");

  //Transform
  const headerUI = transformHeader(navigation, businessIdentity, language);
  const contactInformationUI = transformContactInformation(
    contactInformation,
    contactCopy.information,
    language,
  );
  const contactFormUI = transformContactForm(contactCopy.form, language);
  const mapUI = transformMap(contactInformation, contactCopy.map, language);
  const footerUI = transformFooter(
    businessIdentity,
    contactInformation,
    language,
  );
  //Render
  renderHeader(headerUI, headerContainer, handleLanguageToggle);
  renderContactInformation(contactInformationUI, contactInformationContainer);
  renderContactForm(
    contactFormUI,
    formInstructionsContainer,
    formMessagesContainer,
    formContainer,
  );
  renderMap(mapUI, mapContainer, mapAdditionalContainer);
  renderFooter(footerUI, footerContainer);
}

function handleLanguageToggle() {
  toggleLanguage();
  initContact();
}
