import { transformServices } from "./transformServices.js";

export function transformServicesList(services, media, copy, language) {
  //Build Services List UI structure (full catalogue, no limit)
  return {
    type: "servicesList",
    content: {
      heading: copy?.heading?.[language],
      sub: copy?.sub?.[language],
      cards: transformServices(services, media, language),
    },
  };
}
