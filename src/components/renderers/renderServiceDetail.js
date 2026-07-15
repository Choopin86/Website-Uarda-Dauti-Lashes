export function renderServiceDetail(detailUI, dialog) {
  // Clear existing content
  dialog.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "detail-content";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "detail-close";
  closeButton.setAttribute("aria-label", detailUI.content.labels.close || "Close");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => dialog.close());

  const title = document.createElement("h3");
  title.className = "detail-title";
  title.textContent = detailUI.content.title;

  const meta = document.createElement("p");
  meta.className = "detail-meta";
  meta.textContent = `${detailUI.content.duration} · ${detailUI.content.price}`;

  const description = document.createElement("p");
  description.className = "detail-description";
  description.textContent = detailUI.content.description;

  wrapper.append(closeButton, title, meta, description);

  const images = detailUI.content.media.filter((m) => m.type === "image");
  const videos = detailUI.content.media.filter((m) => m.type === "video");

  if (videos.length) {
    const videoWrapper = document.createElement("div");
    videoWrapper.className = "detail-video";
    videos.forEach((item) => {
      const video = document.createElement("video");
      video.src = item.url;
      video.controls = true;
      videoWrapper.appendChild(video);
    });
    if (detailUI.content.videoDescription) {
      const caption = document.createElement("p");
      caption.className = "detail-caption";
      caption.textContent = detailUI.content.videoDescription;
      videoWrapper.appendChild(caption);
    }
    wrapper.appendChild(videoWrapper);
  }

  if (images.length) {
    const gallery = document.createElement("div");
    gallery.className = "detail-gallery";
    images.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.alt || detailUI.content.title;
      gallery.appendChild(img);
    });
    wrapper.appendChild(gallery);
    if (detailUI.content.imageDescription) {
      const caption = document.createElement("p");
      caption.className = "detail-caption";
      caption.textContent = detailUI.content.imageDescription;
      wrapper.appendChild(caption);
    }
  }

  if (detailUI.content.policies) {
    const policiesLabel = document.createElement("p");
    policiesLabel.className = "detail-policies-label";
    policiesLabel.textContent = detailUI.content.labels.policies;

    const policies = document.createElement("p");
    policies.className = "detail-policies";
    policies.textContent = detailUI.content.policies;

    wrapper.append(policiesLabel, policies);
  }

  const bookButton = document.createElement("a");
  bookButton.className = "btn-pill btn-pill--solid detail-book";
  bookButton.href = detailUI.content.bookLink;
  bookButton.target = "_blank";
  bookButton.rel = "noopener noreferrer";
  bookButton.textContent = detailUI.content.labels.bookNow;
  wrapper.appendChild(bookButton);

  dialog.appendChild(wrapper);
}
