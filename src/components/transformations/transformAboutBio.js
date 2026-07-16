export function transformAboutBio(bio, media, language) {
  //Resolve portrait image from MediaModel — missing ref is not fatal
  const portraitImage =
    media.find((item) => item.id === bio.portraitMediaId) || null;

  //Build About Bio UI structure
  return {
    type: "about-bio",
    content: {
      shortBio: bio.shortBio[language],
      portraitImage: portraitImage && {
        url: portraitImage.url,
        alt: portraitImage.altText[language],
      },
    },
  };
}
