export function renderAboutBio(aboutBioUi, container) {
  //Clear existing content
  container.innerHTML = "";

  const { shortBio, portraitImage } = aboutBioUi.content;

  if (portraitImage) {
    const image = document.createElement("img");
    image.src = portraitImage.url;
    image.alt = portraitImage.alt;
    container.appendChild(image);
  }

  const bioText = shortBio.map((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    return p;
  });
  container.append(...bioText);
}
