export function transformServicesIntro(businessIdentity, media, language) {
  //Resolve cover image from MediaModel — missing ref is not fatal
  const coverImage =
    media.find((item) => item.id === businessIdentity.servicesCoverImage) || null;

  //Build Services Intro UI structure
  return {
    type: "servicesIntro",
    content: {
      introText: businessIdentity.servicesIntroText[language],
      coverImage: coverImage && {
        url: coverImage.url,
        alt: coverImage.altText[language],
      },
    },
  };
}
