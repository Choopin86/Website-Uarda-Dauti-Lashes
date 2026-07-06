export function renderTrust(trustUI, container) {
  //Clear existing content
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "trust-items";

  trustUI.content.items.forEach((item) => {
    const trustItem = document.createElement("div");
    trustItem.className = "trust-item";

    const iconWrapper = document.createElement("span");
    iconWrapper.className = "trust-icon";
    const icon = document.createElement("i");
    icon.className = item.icon;
    iconWrapper.appendChild(icon);

    const label = document.createElement("p");
    label.className = "trust-label";
    label.textContent = item.label;

    trustItem.append(iconWrapper, label);
    wrapper.appendChild(trustItem);
  });

  container.appendChild(wrapper);
}
