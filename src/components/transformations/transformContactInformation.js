export function transformContactInformation(contactInformation, copy, language) {
  const phoneDigits = contactInformation.phone.replace(/\s+/g, "");

  //Build Contact Information UI structure
  return {
    type: "contactInformation",
    content: {
      eyebrow: copy.eyebrow[language],
      title: copy.title[language],
      phone: {
        display: contactInformation.phone,
        href: `tel:${phoneDigits}`,
      },
      email: {
        display: contactInformation.email,
        href: `mailto:${contactInformation.email}`,
      },
      address: contactInformation.address[language],
      openingHours: contactInformation.openingHours[language],
      socialLinks: contactInformation.socialLinks.map((link) => ({
        platform: link.platform,
        url: link.url,
        icon: link.icon,
      })),
    },
  };
}
