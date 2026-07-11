export function renderServicesIntro(servicesIntroUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const { coverImage, introText } = servicesIntroUI.content;

  if (coverImage) {
    const media = document.createElement("div");
    media.className = "services-intro-media";
    const image = document.createElement("img");
    image.src = coverImage.url;
    image.alt = coverImage.alt;
    media.appendChild(image);
    container.appendChild(media);

    const overlay = document.createElement("div");
    overlay.className = "services-intro-overlay";
    container.appendChild(overlay);
  }

  const textWrap = document.createElement("div");
  textWrap.className = "services-intro-text";
  const text = document.createElement("p");
  text.textContent = introText;
  textWrap.appendChild(text);
  container.appendChild(textWrap);
}
