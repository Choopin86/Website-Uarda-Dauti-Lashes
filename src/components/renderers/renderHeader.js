export function renderHeader(headerUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const brandLink = document.createElement("a");
  brandLink.className = "brand-link";
  brandLink.href = "/";
  brandLink.textContent = headerUI.content.brandName;

  const nav = document.createElement("nav");
  nav.className = "main-nav";

  const list = document.createElement("ul");
  list.className = "nav-links";

  headerUI.content.links.forEach((link) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    item.appendChild(anchor);
    list.appendChild(item);
  });

  nav.appendChild(list);

  //Assemble
  container.append(brandLink, nav);
}
