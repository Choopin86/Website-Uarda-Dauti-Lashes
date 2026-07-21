export function transformMap(contactInformation, copy, language) {
  const { lat, lng } = contactInformation.GPS;
  //Google Maps expects an ISO language code — the site's "al" is Albanian ("sq")
  const mapLanguage = language === "al" ? "sq" : "en";

  //Build Map UI structure
  return {
    type: "map",
    content: {
      embedUrl: `https://www.google.com/maps?q=${lat},${lng}&z=17&hl=${mapLanguage}&output=embed`,
      mapLabel: copy.mapLabel[language],
      fallbackText: `${copy.fallbackLead[language]} ${contactInformation.address[language]}`,
      directions: {
        label: copy.directionsLabel[language],
        url: contactInformation.location,
      },
    },
  };
}
