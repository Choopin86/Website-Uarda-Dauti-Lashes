export function transformAboutHeader(businessIdentity, media, language) {
  //Resolve cover image from MediaModel — missing ref is not fatal
  const heroImage =
    media.find((item) => item.id === businessIdentity.heroImage) || null;

  //Build About Header UI structure
  return {
    type: "aboutHeader",
    content: {
      brandName: businessIdentity.brandName[language],
      brandSlogan: businessIdentity.brandSlogan[language],
      heroImage: heroImage && {
        url: heroImage.url,
        alt: heroImage.altText[language],
      },
    },
  };
}
