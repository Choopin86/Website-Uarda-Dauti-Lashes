import bio from "../data/bio.json";
import media from "../data/media.json";
import businessIdentity from "../data/businessIdentity.json";
import achievements from "../data/achievements.json";
import homeCopy from "../data/homeCopy.json";

import { transformAboutHeader } from "./transformations/transformAboutHeader.js";
import { renderAboutHeader } from "./renderers/renderAboutHeader.js";
import { transformAboutBio } from "./transformations/transformAboutBio.js";
import { renderAboutBio } from "./renderers/renderAboutBio.js";
import { transformAchievements } from "./transformations/transformAchievements.js";
import { renderAchievements } from "./renderers/renderAchievements.js";
import { getLanguage, toggleLanguage } from "../utils/language.js";

export function initAbout() {
  const language = getLanguage();
  const aboutHeaderContainer = document.querySelector(".about-header");
  const portraitContainer = document.querySelector(".portrait-container");
  const aboutBioContainer = document.querySelector(".bio-container");
  const achievementsContainer = document.querySelector(".achievements-section");

  //Transform
  const aboutHeaderUI = transformAboutHeader(businessIdentity, media, language);
  const aboutBioUI = transformAboutBio(bio, media, language);
  const achievementsUI = transformAchievements(
    achievements,
    media,
    language,
    homeCopy.achievements,
  );

  //Render
  renderAboutHeader(aboutHeaderUI, aboutHeaderContainer);
  renderAboutBio(aboutBioUI, portraitContainer, aboutBioContainer);
  renderAchievements(achievementsUI, achievementsContainer);
}

function handleLanguageToggle() {
  toggleLanguage();
  initAbout();
}
