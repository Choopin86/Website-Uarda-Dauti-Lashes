export function renderAboutHeader(aboutHeaderUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const { heroImage, brandName, brandSlogan } = aboutHeaderUI.content;

  if (heroImage) {
    const image = document.createElement("img");
    image.src = heroImage.url;
    image.alt = heroImage.alt;
    container.appendChild(image);
  }

  const brand = document.createElement("h1");
  brand.textContent = brandName;
  const slogan = document.createElement("p");
  slogan.textContent = brandSlogan;
  container.appendChild(brand);
  container.appendChild(slogan);
}
