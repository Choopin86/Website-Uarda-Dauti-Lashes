export function renderHero(heroUI, container) {
  //Clear existing content
  container.innerHTML = "";

  // Create elements
  const wrapper = document.createElement("div");
  wrapper.className = "hero-content";

  const title = document.createElement("h1");
  title.textContent = heroUI.content.brandName;

  const slogan = document.createElement("h2");
  slogan.textContent = heroUI.content.brandSlogan;

  const text = document.createElement("p");
  text.textContent = heroUI.content.heroText;

  const image = document.createElement("img");
  image.src = heroUI.content.heroImage.url;
  image.lat = heroUI.content.heroImage.alt;

  //Assemble
  wrapper.append(title, slogan, text);
  container.append(image, wrapper);
}
