export function transformFooter(businessIdentity, contactInformation, language) {
  //Build Footer UI structure
  return {
    type: "footer",
    content: {
      brandName: businessIdentity.brandName[language],
      address: contactInformation.address[language],
      phone: contactInformation.phone,
      email: contactInformation.email,
      openingHours: contactInformation.openingHours[language],
      socialLinks: contactInformation.socialLinks.map((link) => ({
        platform: link.platform,
        url: link.url,
        icon: link.icon,
      })),
      copyright: `© ${new Date().getFullYear()} ${businessIdentity.brandName[language]}`,
    },
  };
}
