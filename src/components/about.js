import bio from "../data/bio.json";
import media from "../data/media.json";
import businessIdentity from "../data/businessIdentity.json";

import { transformAboutHeader } from "./transformations/transformAboutHeader.js";
import { renderAboutHeader } from "./renderers/renderAboutHeader.js";
import { transformAboutBio } from "./transformations/transformAboutBio.js";
import { renderAboutBio } from "./renderers/renderAboutBio.js";
import { getLanguage, toggleLanguage } from "../utils/language.js";

export function initAbout() {
  const language = getLanguage();
  const aboutHeaderContainer = document.querySelector(".about-header");
  const aboutBioContainer = document.querySelector(".bio-container");

  //Transform
  const aboutHeaderUI = transformAboutHeader(businessIdentity, media, language);
  const aboutBioUI = transformAboutBio(bio, media, language);

  //Render
  renderAboutHeader(aboutHeaderUI, aboutHeaderContainer);
  renderAboutBio(aboutBioUI, aboutBioContainer);
}

function handleLanguageToggle() {
  toggleLanguage();
  initAbout();
}
