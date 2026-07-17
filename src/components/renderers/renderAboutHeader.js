export function renderAboutHeader(aboutHeaderUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const { heroImage, brandName, brandSlogan } = aboutHeaderUI.content;

  const aboutHeaderWrapper = document.createElement("div");
  aboutHeaderWrapper.classList.add("about-header-wrapper");
  container.appendChild(aboutHeaderWrapper);

  const aboutHeaderPortrait = document.createElement("div");
  aboutHeaderPortrait.classList.add("about-header-portrait");
  aboutHeaderWrapper.appendChild(aboutHeaderPortrait);

  const aboutHeaderContent = document.createElement("div");
  aboutHeaderContent.classList.add("about-header-content");
  aboutHeaderWrapper.appendChild(aboutHeaderContent);

  if (heroImage) {
    const image = document.createElement("img");
    image.src = heroImage.url;
    image.alt = heroImage.alt;
    image.classList.add("about-hero-image");
    aboutHeaderPortrait.appendChild(image);
  }

  const brand = document.createElement("h1");
  brand.textContent = brandName;
  brand.classList.add("about-brand-name");
  const slogan = document.createElement("p");
  slogan.textContent = brandSlogan;
  slogan.classList.add("about-brand-slogan");
  aboutHeaderContent.appendChild(brand);
  aboutHeaderContent.appendChild(slogan);
}
