import { transformServices } from "./transformServices.js";

export function transformServicesList(
  services,
  media,
  copy,
  language,
  contactInformation,
) {
  //Build Services List UI structure (full catalogue, no limit)
  return {
    type: "servicesList",
    content: {
      heading: copy?.heading?.[language],
      sub: copy?.sub?.[language],
      labels: {
        bookNow: copy?.bookNow?.[language],
      },
      cards: transformServices(
        services,
        media,
        language,
        null,
        contactInformation?.["book-link"],
      ),
    },
  };
}
