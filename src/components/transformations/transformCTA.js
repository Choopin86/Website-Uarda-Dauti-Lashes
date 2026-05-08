export function transformCTA(contactInformation, language) {
  const instagram = contactInformation.socialLinks.find(
    (item) => item.platform === "instagram",
  );

  const whatsapp = contactInformation.socialLinks.find(
    (item) => item.platform === "whatsapp",
  );

  const tiktok = contactInformation.socialLinks.find(
    (item) => item.platform === "tiktok",
  );

  return {
    type: "CTA",
    content: {
      phone: contactInformation.phone,
      email: contactInformation.email,
      address: contactInformation.address[language],
      location: contactInformation.location,
      openingHours: contactInformation.openingHours[language],
      instagram: instagram,
      whatsapp: whatsapp,
      tiktok: tiktok,
    },
  };
}
