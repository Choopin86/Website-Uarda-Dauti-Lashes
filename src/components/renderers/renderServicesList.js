export function renderServicesList(servicesListUI, container, onSelectService) {
  // Clear existing content
  container.innerHTML = "";

  if (!Array.isArray(servicesListUI.content?.cards)) {
    throw new Error("renderServicesList expects a services list structure");
  }

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = servicesListUI.content.heading;

  const sub = document.createElement("p");
  sub.className = "section-sub";
  sub.textContent = servicesListUI.content.sub;

  const wrapper = document.createElement("div");
  wrapper.className = "services-grid";

  servicesListUI.content.cards.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    // Optional image (use first image if available)
    const thumbnail = (service.content.media || []).find(
      (m) => m.type === "image",
    );
    if (thumbnail) {
      const img = document.createElement("img");
      img.src = thumbnail.url;
      img.alt = thumbnail.alt || service.content.title;
      img.className = "service-image";
      card.appendChild(img);
    }

    const category = document.createElement("p");
    category.className = "service-category";
    category.textContent = service.content.category;

    const title = document.createElement("h3");
    title.className = "service-title";
    title.textContent = service.content.title;

    const description = document.createElement("p");
    description.className = "service-desc";
    description.textContent = service.content.shortDescription;

    const meta = document.createElement("p");
    meta.className = "service-price";
    meta.textContent = `${service.content.duration} · ${service.content.price}`;

    const textWrapper = document.createElement("div");
    textWrapper.className = "service-text";
    textWrapper.append(category, title, description, meta);
    card.appendChild(textWrapper);

    const selectService = () => onSelectService(service.id);
    card.addEventListener("click", selectService);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectService();
      }
    });

    wrapper.appendChild(card);
  });

  container.append(heading, sub, wrapper);
}
