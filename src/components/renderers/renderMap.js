export function renderMap(mapUI, mapContainer, additionalContainer) {
  const { content } = mapUI;

  //Clear existing content
  mapContainer.innerHTML = "";
  additionalContainer.innerHTML = "";

  //Map embed
  const frame = document.createElement("iframe");
  frame.className = "map-frame";
  frame.src = content.embedUrl;
  frame.title = content.mapLabel;
  frame.loading = "lazy";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "no-referrer-when-downgrade";
  mapContainer.appendChild(frame);

  //Fallback text + external directions link
  const fallback = document.createElement("p");
  fallback.className = "map-fallback";
  fallback.textContent = content.fallbackText;

  const directions = document.createElement("a");
  directions.className = "btn-pill map-directions";
  directions.href = content.directions.url;
  directions.target = "_blank";
  directions.rel = "noopener noreferrer";
  directions.textContent = content.directions.label;

  additionalContainer.append(fallback, directions);
}
