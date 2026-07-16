import businessIdentity from "../data/businessIdentity.json";
import contactInformation from "../data/contactInformation.json";
import bio from "../data/bio.json";
import media from "../data/media.json";
import navigation from "../data/navigation.json";
import achievements from "../data/achievements.json";
import homeCopy from "../data/homeCopy.json";

import { transformHeader } from "./transformations/transformHeader.js";
import { renderHeader } from "./renderers/renderHeader.js";
import { transformAboutHeader } from "./transformations/transformAboutHeader.js";
import { renderAboutHeader } from "./renderers/renderAboutHeader.js";
import { transformAboutBio } from "./transformations/transformAboutBio.js";
import { renderAboutBio } from "./renderers/renderAboutBio.js";
import { transformAchievements } from "./transformations/transformAchievements.js";
import { renderAchievements } from "./renderers/renderAchievements.js";
import { transformFooter } from "./transformations/transformFooter.js";
import { renderFooter } from "./renderers/renderFooter.js";
import { getLanguage, toggleLanguage } from "../utils/language.js";

export function initAbout() {
  const language = getLanguage();
  const headerContainer = document.querySelector(".header");
  const aboutHeaderContainer = document.querySelector(".about-header");
  const portraitContainer = document.querySelector(".portrait-container");
  const aboutBioContainer = document.querySelector(".bio-container");
  const achievementsContainer = document.querySelector(".achievements-section");
  const footerContainer = document.querySelector(".footer");

  //Transform
  const headerUI = transformHeader(navigation, businessIdentity, language);
  const aboutHeaderUI = transformAboutHeader(businessIdentity, media, language);
  const aboutBioUI = transformAboutBio(bio, media, language);
  const achievementsUI = transformAchievements(
    achievements,
    media,
    language,
    homeCopy.achievements,
  );
  const footerUI = transformFooter(
    businessIdentity,
    contactInformation,
    language,
  );

  //Render
  renderHeader(headerUI, headerContainer, handleLanguageToggle);
  renderAboutHeader(aboutHeaderUI, aboutHeaderContainer);
  renderAboutBio(aboutBioUI, portraitContainer, aboutBioContainer);
  renderAchievements(achievementsUI, achievementsContainer);
  renderFooter(footerUI, footerContainer);
}

function handleLanguageToggle() {
  toggleLanguage();
  initAbout();
}
