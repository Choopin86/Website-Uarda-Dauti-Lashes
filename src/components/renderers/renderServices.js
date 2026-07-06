export function renderServices(servicesUI, container) {
  // Clear existing content
  container.innerHTML = "";

  if (!Array.isArray(servicesUI.content?.cards)) {
    throw new Error("renderServices expects a services preview structure");
  }

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = servicesUI.content.heading;

  const sub = document.createElement("p");
  sub.className = "section-sub";
  sub.textContent = servicesUI.content.sub;

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "services-grid";

  servicesUI.content.cards.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";

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

    const price = document.createElement("p");
    price.className = "service-price";
    price.textContent = service.content.price;

    const bookButton = document.createElement("a");
    bookButton.className = "btn-pill btn-pill--solid service-book";
    bookButton.href = service.content.bookLink;
    bookButton.target = "_blank";
    bookButton.rel = "noopener noreferrer";
    bookButton.textContent = servicesUI.content.labels?.bookNow;

    const textWrapper = document.createElement("div");
    textWrapper.className = "service-text";
    textWrapper.append(category, title, price, bookButton);
    card.appendChild(textWrapper);

    wrapper.appendChild(card);
  });

  const browseAll = document.createElement("a");
  browseAll.className = "btn-pill";
  browseAll.href = servicesUI.content.browseAll.href;
  browseAll.textContent = servicesUI.content.browseAll.label;

  const actions = document.createElement("div");
  actions.className = "services-actions";
  actions.appendChild(browseAll);

  container.append(heading, sub, wrapper, actions);
}
