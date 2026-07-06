export function transformBookingCTA(contactInformation) {
  const instagram = contactInformation.socialLinks.find(
    (item) => item.platform === "instagram",
  );
  const whatsapp = contactInformation.socialLinks.find(
    (item) => item.platform === "whatsapp",
  );
  const tiktok = contactInformation.socialLinks.find(
    (item) => item.platform === "tiktok",
  );

  //Build Booking CTA UI structure (icons only, no heading/copy)
  return {
    type: "bookingCTA",
    content: {
      phone: contactInformation.phone,
      instagram,
      whatsapp,
      tiktok,
    },
  };
}
