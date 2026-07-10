import businessIdentity from "../data/businessIdentity.json";
import media from "../data/media.json";
import contactInformation from "../data/contactInformation.json";
import services from "../data/services.json";
import achievements from "../data/achievements.json";
import navigation from "../data/navigation.json";
import bio from "../data/bio.json";
import trustHighlights from "../data/trustHighlights.json";
import homeCopy from "../data/homeCopy.json";

import { transformHeader } from "./transformations/transformHeader.js";
import { renderHeader } from "./renderers/renderHeader.js";
import { transformHero } from "./transformations/transformHero.js";
import { renderHero } from "./renderers/renderHero.js";
import { transformTrust } from "./transformations/transformTrust.js";
import { renderTrust } from "./renderers/renderTrust.js";
import { transformFeaturedService } from "./transformations/transformFeaturedService.js";
import { renderFeaturedService } from "./renderers/renderFeaturedService.js";
import { transformServicesPreview } from "./transformations/transformServicesPreview.js";
import { renderServices } from "./renderers/renderServices.js";
import { transformAchievements } from "./transformations/transformAchievements.js";
import { renderAchievements } from "./renderers/renderAchievements.js";
import { transformAbout } from "./transformations/transformAbout.js";
import { renderAbout } from "./renderers/renderAbout.js";
import { transformCTA } from "./transformations/transformCTA.js";
import { renderCTA } from "./renderers/renderCTA.js";
import { transformFooter } from "./transformations/transformFooter.js";
import { renderFooter } from "./renderers/renderFooter.js";
import { getLanguage, toggleLanguage } from "../utils/language.js";

const FEATURED_SERVICE_ID = "service8"; // Professional Lash Courses
const SERVICES_PREVIEW_LIMIT = 6;

export function initHome() {
  const language = getLanguage();
  const headerContainer = document.querySelector(".header");
  const heroContainer = document.querySelector(".hero");
  const trustContainer = document.querySelector(".trust-strip");
  const featuredContainer = document.querySelector(".featured-service");
  const servicesContainer = document.querySelector(".services-preview");
  const achievementsContainer = document.querySelector(".achievements-preview");
  const aboutContainer = document.querySelector(".about-preview");
  const ctaContainer = document.querySelector(".main-cta");
  const footerContainer = document.querySelector(".footer");

  //Transform
  const headerUI = transformHeader(navigation, businessIdentity, language);
  const heroUI = transformHero(businessIdentity, media, language);
  const trustUI = transformTrust(trustHighlights, language);
  const featuredUI = transformFeaturedService(
    services,
    media,
    homeCopy.featured,
    FEATURED_SERVICE_ID,
    language,
  );
  const servicesUI = transformServicesPreview(
    services,
    media,
    homeCopy.services,
    language,
    SERVICES_PREVIEW_LIMIT,
    contactInformation,
  );
  const achievementsUI = transformAchievements(
    achievements,
    media,
    language,
    homeCopy.achievements,
  );
  const aboutUI = transformAbout(bio, homeCopy.about, language);
  const ctaUI = transformCTA(contactInformation, language, homeCopy.cta);
  const footerUI = transformFooter(
    businessIdentity,
    contactInformation,
    language,
  );

  //Render
  renderHeader(headerUI, headerContainer, handleLanguageToggle);
  renderHero(heroUI, heroContainer);
  renderTrust(trustUI, trustContainer);
  renderFeaturedService(featuredUI, featuredContainer);
  renderServices(servicesUI, servicesContainer);
  renderAchievements(achievementsUI, achievementsContainer);
  renderAbout(aboutUI, aboutContainer);
  renderCTA(ctaUI, ctaContainer);
  renderFooter(footerUI, footerContainer);
}

function handleLanguageToggle() {
  toggleLanguage();
  initHome();
}
