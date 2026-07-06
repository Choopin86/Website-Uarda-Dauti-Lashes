export function renderAbout(aboutUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "about-content";

  const eyebrow = document.createElement("p");
  eyebrow.className = "section-eyebrow";
  eyebrow.textContent = aboutUI.content.eyebrow;

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = aboutUI.content.heading;

  wrapper.append(eyebrow, heading);

  aboutUI.content.paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.className = "about-paragraph";
    paragraph.textContent = text;
    wrapper.appendChild(paragraph);
  });

  container.appendChild(wrapper);
}
