export function renderAboutBio(aboutBioUi, portraitContainer, bioContainer) {
  //Clear existing content
  portraitContainer.innerHTML = "";
  bioContainer.innerHTML = "";

  const { shortBio, portraitImage } = aboutBioUi.content;

  if (portraitImage) {
    const image = document.createElement("img");
    image.classList.add("about-portrait");
    image.src = portraitImage.url;
    image.alt = portraitImage.alt;
    portraitContainer.appendChild(image);
  }

  const bioText = shortBio.map((paragraph) => {
    const p = document.createElement("p");
    p.classList.add("about-bio-paragraph");
    p.textContent = paragraph;
    return p;
  });
  bioContainer.append(...bioText);
}
