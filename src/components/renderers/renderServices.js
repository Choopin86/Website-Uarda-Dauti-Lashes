export function renderServices(servicesUI, container) {
  // Clear existing content
  container.innerHTML = "";

  if (!Array.isArray(servicesUI)) {
    throw new Error("renderServices expects an array of services");
  }

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "services-grid";

  servicesUI.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";

    const title = document.createElement("h3");
    title.textContent = service.content.title;

    const description = document.createElement("p");
    description.textContent = service.content.shortDescription;

    const price = document.createElement("p");
    price.className = "service-price";
    price.textContent = service.content.price;

    const duration = document.createElement("p");
    duration.className = "service-duration";
    duration.textContent = service.content.duration;

    const category = document.createElement("p");
    category.className = "service-category";
    category.textContent = service.content.category;

    // Optional image (use first image if available)
    if (service.content.media && service.content.media.length > 0) {
      const img = document.createElement("img");
      img.src = service.content.media[0].url;
      img.alt = service.content.media[0].alt || service.content.title;
      img.className = "service-image";
      card.appendChild(img);
    }

    const textWrapper = document.createElement("div");
    textWrapper.className = "service-text";

    textWrapper.append(title, description, price, duration, category);
    card.appendChild(textWrapper);

    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}
