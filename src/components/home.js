import businessIdentity from "../data/businessIdentity.json";
import media from "../data/media.json";
import contactInformation from "../data/contactInformation.json";

import { transformHero } from "./transformations/transformHero.js";
import { renderHero } from "./renderers/renderHero.js";
import { transformCTA } from "./transformations/transformCTA.js";
import { renderCTA } from "./renderers/renderCTA.js";

export function initHome() {
  const language = "al"; //Change into a toggle function
  const heroContainer = document.querySelector(".hero");
  const ctaContainer = document.querySelector(".main-cta");

  //Transform
  const heroUI = transformHero(businessIdentity, media, language);
  const ctaUI = transformCTA(contactInformation, language);

  //Render
  renderHero(heroUI, heroContainer);
  renderCTA(ctaUI, ctaContainer);
}
