import businessIdentity from "../data/businessIdentity.json";
import media from "../data/media.json";
import contactInformation from "../data/contactInformation.json";
import services from "../data/services.json";
import achievements from "../data/achievements.json";
import navigation from "../data/navigation.json";

import { transformHeader } from "./transformations/transformHeader.js";
import { renderHeader } from "./renderers/renderHeader.js";
import { transformHero } from "./transformations/transformHero.js";
import { renderHero } from "./renderers/renderHero.js";
import { transformCTA } from "./transformations/transformCTA.js";
import { renderCTA } from "./renderers/renderCTA.js";
import { transformAchievements } from "./transformations/transformAchievements.js";
import { renderAchievements } from "./renderers/renderAchievements.js";
import { transformServices } from "./transformations/transformServices.js";
import { renderServices } from "./renderers/renderServices.js";
import { transformFooter } from "./transformations/transformFooter.js";
import { renderFooter } from "./renderers/renderFooter.js";

export function initHome() {
  const language = "al"; //Change into a toggle function
  const headerContainer = document.querySelector(".header");
  const heroContainer = document.querySelector(".hero");
  const ctaContainer = document.querySelector(".main-cta");
  const achievementsContainer = document.querySelector(
    ".achievements-preview",
  );
  const servicesContainer = document.querySelector(".services-preview");
  const footerContainer = document.querySelector(".footer");

  //Transform
  const headerUI = transformHeader(navigation, businessIdentity, language);
  const heroUI = transformHero(businessIdentity, media, language);
  const ctaUI = transformCTA(contactInformation, language);
  const achievementsUI = transformAchievements(achievements, media, language);
  const servicesUI = transformServices(services, media, language);
  const footerUI = transformFooter(businessIdentity, contactInformation, language);
  //Render
  renderHeader(headerUI, headerContainer);
  renderHero(heroUI, heroContainer);
  renderCTA(ctaUI, ctaContainer);
  renderAchievements(achievementsUI, achievementsContainer);
  renderServices(servicesUI, servicesContainer);
  renderFooter(footerUI, footerContainer);
}
