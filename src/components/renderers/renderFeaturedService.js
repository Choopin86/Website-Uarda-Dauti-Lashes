export function renderFeaturedService(featuredUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "featured-content";

  const eyebrow = document.createElement("p");
  eyebrow.className = "section-eyebrow";
  eyebrow.textContent = featuredUI.content.eyebrow;

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = featuredUI.content.title;

  const description = document.createElement("p");
  description.className = "featured-description";
  description.textContent = featuredUI.content.description;

  const meta = document.createElement("p");
  meta.className = "featured-meta";
  meta.textContent = `${featuredUI.content.price} · ${featuredUI.content.duration}`;

  const button = document.createElement("a");
  button.className = "btn-pill btn-pill--solid";
  button.href = featuredUI.content.button.href;
  button.textContent = featuredUI.content.button.label;

  wrapper.append(eyebrow, title, description, meta, button);

  // Optional image (use first image if available)
  const thumbnail = featuredUI.content.media.find((m) => m.type === "image");
  if (thumbnail) {
    const figure = document.createElement("div");
    figure.className = "featured-figure";
    const img = document.createElement("img");
    img.src = thumbnail.url;
    img.alt = thumbnail.alt || featuredUI.content.title;
    figure.appendChild(img);
    container.appendChild(figure);
  }

  container.appendChild(wrapper);
}
