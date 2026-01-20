export function transformHero(businessIdentity, media, language) {
  //Resolve Hero Image from MedioModel
  const heroImage = media.find(
    (item) => item.id === businessIdentity.heroImage
  );

  if (!heroImage) {
    throw new Error("Hero image not found in MediaModel");
  }
  //Hero UI structure
  return {
    type: "hero",
    content: {
      brandName: businessIdentity.brandName[language],
      brandSlogan: businessIdentity.brandSlogan[language],
      heroText: businessIdentity.heroText[language],
      heroImage: {
        url: heroImage.url,
        alt: heroImage.altText[language],
      },
    },
  };
}
