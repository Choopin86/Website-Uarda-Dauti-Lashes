import { transformServices } from "./transformServices.js";

export function transformServicesPreview(
  services,
  media,
  copy,
  language,
  limit,
) {
  //Build Services Preview UI structure
  return {
    type: "servicesPreview",
    content: {
      heading: copy.heading?.[language],
      sub: copy.sub?.[language],
      browseAll: {
        label: copy.browseAll?.[language],
        href: "/services.html",
      },
      cards: transformServices(services, media, language, limit),
    },
  };
}
