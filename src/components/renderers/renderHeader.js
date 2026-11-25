export function renderHeader(headerUI, container, onToggleLanguage) {
  //Clear existing content
  container.innerHTML = "";

  const brandLink = document.createElement("a");
  brandLink.className = "brand-link";
  brandLink.href = "/";
  brandLink.textContent = headerUI.content.brandName;

  const nav = document.createElement("nav");
  nav.className = "main-nav";

  const isAlbanian = headerUI.content.language === "al";
  const openLabel = isAlbanian ? "Hap menynë" : "Open menu";
  const closeLabel = isAlbanian ? "Mbyll menynë" : "Close menu";

  const navToggle = document.createElement("button");
  navToggle.type = "button";
  navToggle.className = "nav-toggle";
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-controls", "nav-links");
  navToggle.setAttribute("aria-label", openLabel);

  for (let i = 0; i < 3; i++) {
    const bar = document.createElement("span");
    bar.className = "nav-toggle__bar";
    navToggle.appendChild(bar);
  }

  const list = document.createElement("ul");
  list.className = "nav-links";
  list.id = "nav-links";

  const closeMenu = () => {
    list.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", openLabel);
  };

  navToggle.addEventListener("click", () => {
    const isOpen = list.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
  });

  list.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMenu();
    }
  });

  headerUI.content.links.forEach((link) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    item.appendChild(anchor);
    list.appendChild(item);
  });

  //Language toggle
  const langItem = document.createElement("li");
  const langToggle = document.createElement("button");
  langToggle.type = "button";
  langToggle.className = "lang-toggle btn-pill";
  langToggle.setAttribute("aria-label", "Switch site language");

  const alOption = document.createElement("span");
  alOption.className = "lang-toggle__option";
  alOption.textContent = "AL";
  if (headerUI.content.language === "al") {
    alOption.classList.add("is-active");
  }

  const divider = document.createElement("span");
  divider.className = "lang-toggle__divider";
  divider.textContent = "/";

  const enOption = document.createElement("span");
  enOption.className = "lang-toggle__option";
  enOption.textContent = "EN";
  if (headerUI.content.language === "en") {
    enOption.classList.add("is-active");
  }

  langToggle.append(alOption, divider, enOption);

  if (typeof onToggleLanguage === "function") {
    langToggle.addEventListener("click", onToggleLanguage);
  }

  langItem.appendChild(langToggle);
  list.appendChild(langItem);

  nav.append(navToggle, list);

  //Assemble
  container.append(brandLink, nav);
}
