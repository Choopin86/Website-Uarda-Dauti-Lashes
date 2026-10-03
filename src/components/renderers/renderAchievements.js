const AUTOPLAY_INTERVAL_MS = 5000;

export function renderAchievements(achievementsUI, container) {
  const slidesUI = achievementsUI.content?.slides;
  if (!Array.isArray(slidesUI)) {
    throw new Error("renderAchievements expects an achievements structure");
  }

  //Clear existing content and any autoplay timer from a previous render
  container.innerHTML = "";
  if (container._autoplayTimer) {
    clearInterval(container._autoplayTimer);
    container._autoplayTimer = null;
  }

  const heading = document.createElement("h2");
  heading.className = "section-title";
  heading.textContent = achievementsUI.content.heading;

  const sub = document.createElement("p");
  sub.className = "section-sub";
  sub.textContent = achievementsUI.content.sub;

  const slider = document.createElement("div");
  slider.className = "achievements-preview-slider";

  const slides = document.createElement("div");
  slides.className = "slides";

  slidesUI.forEach((achievement, index) => {
    const slide = document.createElement("article");
    slide.className = "achievement-slide";
    if (index === 0) slide.classList.add("active");

    // Gallery of all images for this achievement (single image if only one)
    const images = achievement.content.media.filter((m) => m.type === "image");
    if (images.length > 0) {
      const gallery = document.createElement("div");
      gallery.className = "achievement-gallery";

      const galleryImages = document.createElement("div");
      galleryImages.className = "achievement-gallery-images";

      const imgElements = images.map((image, imageIndex) => {
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.alt || achievement.content.competitionName;
        img.className = "achievement-image";
        if (imageIndex === 0) img.classList.add("active");
        galleryImages.appendChild(img);
        return img;
      });

      if (images.length > 1) {
        let activeImageIndex = 0;

        const dots = document.createElement("div");
        dots.className = "achievement-gallery-dots";

        const dotElements = images.map((_, imageIndex) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "gallery-dot";
          if (imageIndex === 0) dot.classList.add("active");
          dot.setAttribute("aria-label", `Image ${imageIndex + 1}`);
          dots.appendChild(dot);
          return dot;
        });

        const showImage = (imageIndex) => {
          imgElements[activeImageIndex].classList.remove("active");
          dotElements[activeImageIndex].classList.remove("active");
          activeImageIndex =
            (imageIndex + imgElements.length) % imgElements.length;
          imgElements[activeImageIndex].classList.add("active");
          dotElements[activeImageIndex].classList.add("active");
        };

        dotElements.forEach((dot, imageIndex) => {
          dot.addEventListener("click", () => showImage(imageIndex));
        });

        const prevButton = document.createElement("button");
        prevButton.type = "button";
        prevButton.className = "gallery-prev";
        prevButton.textContent = "‹";
        prevButton.setAttribute("aria-label", "Previous image");
        prevButton.addEventListener("click", () =>
          showImage(activeImageIndex - 1),
        );

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "gallery-next";
        nextButton.textContent = "›";
        nextButton.setAttribute("aria-label", "Next image");
        nextButton.addEventListener("click", () =>
          showImage(activeImageIndex + 1),
        );

        galleryImages.append(prevButton, nextButton);
        gallery.append(galleryImages, dots);
      } else {
        gallery.appendChild(galleryImages);
      }

      slide.appendChild(gallery);
    }

    const title = document.createElement("h3");
    title.textContent = achievement.content.competitionName;

    const date = document.createElement("p");
    date.className = "achievement-date";
    date.textContent = achievement.content.date;

    const prizes = document.createElement("ul");
    prizes.className = "achievement-prizes";
    achievement.content.prizes.forEach((prize) => {
      const item = document.createElement("li");
      item.textContent = prize;
      prizes.appendChild(item);
    });

    const textWrapper = document.createElement("div");
    textWrapper.className = "achievement-text";
    textWrapper.append(title, date, prizes);

    if (achievement.content.description) {
      const description = document.createElement("p");
      description.className = "achievement-description";
      description.textContent = achievement.content.description;
      textWrapper.insertBefore(description, prizes);
    }

    slide.appendChild(textWrapper);
    slides.appendChild(slide);
  });

  slider.appendChild(slides);

  // Slide switching (controls + autoplay only make sense with 2+ slides)
  if (slidesUI.length > 1) {
    let activeIndex = 0;

    const showSlide = (index) => {
      const slideElements = slides.children;
      slideElements[activeIndex].classList.remove("active");
      activeIndex = (index + slideElements.length) % slideElements.length;
      slideElements[activeIndex].classList.add("active");
    };

    const stopAutoplay = () => {
      if (container._autoplayTimer) {
        clearInterval(container._autoplayTimer);
        container._autoplayTimer = null;
      }
    };

    const controls = document.createElement("div");
    controls.className = "controls";

    const prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "slider-prev";
    prevButton.textContent = "‹";
    prevButton.addEventListener("click", () => {
      stopAutoplay();
      showSlide(activeIndex - 1);
    });

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "slider-next";
    nextButton.textContent = "›";
    nextButton.addEventListener("click", () => {
      stopAutoplay();
      showSlide(activeIndex + 1);
    });

    controls.append(prevButton, nextButton);
    slider.appendChild(controls);

    container._autoplayTimer = setInterval(() => {
      showSlide(activeIndex + 1);
    }, AUTOPLAY_INTERVAL_MS);
  }

  container.append(heading, sub, slider);
}
