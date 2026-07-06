export function renderHero(heroUI, container) {
  //Clear existing content
  container.innerHTML = "";

  // Create elements
  const wrapper = document.createElement("div");
  wrapper.className = "hero-content";

  const brand = document.createElement("p");
  brand.className = "hero-brand";
  brand.textContent = heroUI.content.brandName;

  const slogan = document.createElement("h1");
  slogan.className = "hero-slogan";
  slogan.textContent = heroUI.content.brandSlogan;

  const text = document.createElement("p");
  text.className = "hero-text";
  text.textContent = heroUI.content.heroText;

  const portrait = document.createElement("div");
  portrait.className = "hero-portrait";
  const image = document.createElement("img");
  image.src = heroUI.content.heroImage.url;
  image.alt = heroUI.content.heroImage.alt;
  portrait.appendChild(image);

  //Assemble
  wrapper.append(brand, slogan, text);
  container.append(wrapper, portrait);
}
