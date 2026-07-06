import { transformServices } from "./transformServices.js";

export function transformServicesPreview(
  services,
  media,
  copy,
  language,
  limit,
  contactInformation,
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
      labels: {
        bookNow: copy?.bookNow?.[language],
      },
      cards: transformServices(
        services,
        media,
        language,
        limit,
        contactInformation?.["book-link"],
      ),
    },
  };
}
