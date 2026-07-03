import businessIdentity from "../data/businessIdentity.json";
import media from "../data/media.json";
import contactInformation from "../data/contactInformation.json";
import services from "../data/services.json";

import { transformHero } from "./transformations/transformHero.js";
import { renderHero } from "./renderers/renderHero.js";
import { transformCTA } from "./transformations/transformCTA.js";
import { renderCTA } from "./renderers/renderCTA.js";
import { transformServices } from "./transformations/transformServices.js";
import { renderServices } from "./renderers/renderServices.js";

export function initHome() {
  const language = "al"; //Change into a toggle function
  const heroContainer = document.querySelector(".hero");
  const ctaContainer = document.querySelector(".main-cta");
  const servicesContainer = document.querySelector(".services-preview");

  //Transform
  const heroUI = transformHero(businessIdentity, media, language);
  const ctaUI = transformCTA(contactInformation, language);
  const servicesUI = transformServices(services, media, language);
  //Render
  renderHero(heroUI, heroContainer);
  renderCTA(ctaUI, ctaContainer);
  renderServices(servicesUI, servicesContainer);
}
