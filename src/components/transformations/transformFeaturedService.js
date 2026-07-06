export function transformFeaturedService(
  services,
  media,
  copy,
  featuredId,
  language,
) {
  const service = services.find(
    (item) => item.id === featuredId && item.visibility,
  );

  if (!service) {
    throw new Error(`Featured service "${featuredId}" not found`);
  }

  const resolvedMedia = (service.mediaRefs || [])
    .map((id) => media.find((item) => item.id === id))
    .filter(Boolean);

  //Build Featured Service UI structure
  return {
    type: "featuredService",
    id: service.id,
    content: {
      eyebrow: copy.eyebrow?.[language],
      title: service.title?.[language],
      description: service.description?.[language],
      price: service.price,
      duration: service.duration,
      button: {
        label: copy.button?.[language],
        href: "/contact.html",
      },
      media: resolvedMedia.map((m) => ({
        url: m.url,
        alt: m.altText?.[language],
        type: m.type,
      })),
    },
  };
}
