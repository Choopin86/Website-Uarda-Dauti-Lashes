const AUTOPLAY_INTERVAL_MS = 5000;

export function renderAchievements(achievementsUI, container) {
  if (!Array.isArray(achievementsUI)) {
    throw new Error("renderAchievements expects an array of achievements");
  }

  //Clear existing content and any autoplay timer from a previous render
  container.innerHTML = "";
  if (container._autoplayTimer) {
    clearInterval(container._autoplayTimer);
    container._autoplayTimer = null;
  }

  const slider = document.createElement("div");
  slider.className = "achievements-preview-slider";

  const slides = document.createElement("div");
  slides.className = "slides";

  achievementsUI.forEach((achievement, index) => {
    const slide = document.createElement("article");
    slide.className = "achievement-slide";
    if (index === 0) slide.classList.add("active");

    // Optional thumbnail (use first image if available)
    const thumbnail = achievement.content.media.find(
      (m) => m.type === "image",
    );
    if (thumbnail) {
      const img = document.createElement("img");
      img.src = thumbnail.url;
      img.alt = thumbnail.alt || achievement.content.competitionName;
      img.className = "achievement-image";
      slide.appendChild(img);
    }

    const title = document.createElement("h3");
    title.textContent = achievement.content.competitionName;

    const date = document.createElement("p");
    date.className = "achievement-date";
    date.textContent = achievement.content.date;

    const description = document.createElement("p");
    description.className = "achievement-description";
    description.textContent = achievement.content.description;

    const prizes = document.createElement("ul");
    prizes.className = "achievement-prizes";
    achievement.content.prizes.forEach((prize) => {
      const item = document.createElement("li");
      item.textContent = prize;
      prizes.appendChild(item);
    });

    const textWrapper = document.createElement("div");
    textWrapper.className = "achievement-text";
    textWrapper.append(title, date, description, prizes);

    slide.appendChild(textWrapper);
    slides.appendChild(slide);
  });

  slider.appendChild(slides);

  // Slide switching (controls + autoplay only make sense with 2+ slides)
  if (achievementsUI.length > 1) {
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

  container.appendChild(slider);
}
