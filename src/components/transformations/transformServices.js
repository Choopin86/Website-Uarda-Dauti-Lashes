export function transformServices(services, media, language, limit = null) {
  if (!Array.isArray(services)) {
    throw new Error("Services data must be an array");
  }

  const visible = services
    .filter((service) => service.visibility)
    .sort((a, b) => a.order - b.order);

  return (limit ? visible.slice(0, limit) : visible)
    .map((service) => {
      const resolvedMedia = (service.mediaRefs || [])
        .map((id) => media.find((item) => item.id === id))
        .filter(Boolean);

      return {
        type: "service",
        id: service.id,
        content: {
          title: service.title?.[language],
          shortDescription: service.shortDescription?.[language],
          description: service.description?.[language],
          price: service.price,
          duration: service.duration,
          category: service.category?.[language],
          policies: service.policies?.[language],
          media: resolvedMedia.map((m) => ({
            url: m.url,
            alt: m.altText?.[language],
            type: m.type,
          })),
        },
      };
    });
}
