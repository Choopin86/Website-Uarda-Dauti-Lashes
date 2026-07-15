export function transformServiceDetail(
  services,
  media,
  copy,
  language,
  serviceId,
  contactInformation,
) {
  const service = services.find(
    (item) => item.id === serviceId && item.visibility,
  );

  if (!service) {
    throw new Error(`Service "${serviceId}" not found`);
  }

  const resolvedMedia = (service.mediaRefs || [])
    .map((id) => media.find((item) => item.id === id))
    .filter(Boolean);

  //Build Service Detail UI structure
  return {
    type: "serviceDetail",
    id: service.id,
    content: {
      title: service.title?.[language],
      description: service.description?.[language],
      duration: service.duration,
      price: service.price,
      policies: service.policies?.[language],
      videoDescription: service.videoDescription?.[language],
      imageDescription: service.imageDescription?.[language],
      bookLink: contactInformation?.["book-link"],
      media: resolvedMedia.map((m) => ({
        url: m.url,
        alt: m.altText?.[language],
        type: m.type,
      })),
      labels: {
        bookNow: copy?.bookNow?.[language],
        policies: copy?.policiesLabel?.[language],
        close: copy?.close?.[language],
      },
    },
  };
}
