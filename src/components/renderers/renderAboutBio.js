export function renderAboutBio(aboutBioUi, portraitContainer, bioContainer) {
  //Clear existing content
  portraitContainer.innerHTML = "";
  bioContainer.innerHTML = "";

  const { shortBio, longBio, portraitImage, labels } = aboutBioUi.content;

  if (portraitImage) {
    const image = document.createElement("img");
    image.classList.add("about-portrait");
    image.src = portraitImage.url;
    image.alt = portraitImage.alt;
    portraitContainer.appendChild(image);
  }

  const bioTextContainer = document.createElement("div");
  bioTextContainer.classList.add("about-bio-text");
  bioContainer.appendChild(bioTextContainer);

  function renderParagraphs(paragraphs) {
    bioTextContainer.innerHTML = "";
    const bioText = paragraphs.map((paragraph) => {
      const p = document.createElement("p");
      p.classList.add("about-bio-paragraph");
      p.textContent = paragraph;
      return p;
    });
    bioTextContainer.append(...bioText);
  }

  renderParagraphs(shortBio);

  if (longBio && longBio.length) {
    let expanded = false;

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.classList.add("bio-toggle");
    toggleButton.textContent = labels.readMore;
    toggleButton.setAttribute("aria-expanded", "false");

    toggleButton.addEventListener("click", () => {
      expanded = !expanded;
      renderParagraphs(expanded ? longBio : shortBio);
      toggleButton.textContent = expanded ? labels.readLess : labels.readMore;
      toggleButton.setAttribute("aria-expanded", String(expanded));
    });

    bioContainer.appendChild(toggleButton);
  }
}
