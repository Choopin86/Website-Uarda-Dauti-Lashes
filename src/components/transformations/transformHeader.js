export function transformHeader(navigation, businessIdentity, language) {
  if (!Array.isArray(navigation)) {
    throw new Error("Navigation data must be an array");
  }

  const links = navigation
    .filter((item) => item.visibility)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      label: item.label?.[language],
      href: item.href,
    }));

  //Build Header UI structure
  return {
    type: "header",
    content: {
      brandName: businessIdentity.brandName[language],
      links: links,
    },
  };
}
