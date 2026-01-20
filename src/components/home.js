import businessIdentity from "../data/businessIdentity.json";
import media from "../data/media.json";

import { transformHero } from "./transformations/transformHero.js";
import { renderHero } from "./renderers/renderHero.js";

export function initHome() {
  const language = "al"; //Change into a toggle function
  const heroContainer = document.querySelector(".hero");

  //Transform
  const heroUI = transformHero(businessIdentity, media, language);

  //Render
  renderHero(heroUI, heroContainer);
}
