export function transformAboutBio(bio, media, language, copy) {
  //Resolve portrait image from MediaModel — missing ref is not fatal
  const portraitImage =
    media.find((item) => item.id === bio.portraitMediaId) || null;

  //Build About Bio UI structure
  return {
    type: "about-bio",
    content: {
      shortBio: bio.shortBio[language],
      longBio: bio.longBio[language],
      portraitImage: portraitImage && {
        url: portraitImage.url,
        alt: portraitImage.altText[language],
      },
      labels: {
        readMore: copy?.readMore?.[language],
        readLess: copy?.readLess?.[language],
      },
    },
  };
}
