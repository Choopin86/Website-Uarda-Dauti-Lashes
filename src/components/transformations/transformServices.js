export function transformServices(services, media, language) {
  if (!Array.isArray(services)) {
    throw new Error("Services data must be an array");
  }

  return services
    .filter((service) => service.visibility)
    .sort((a, b) => a.order - b.order)
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
          })),
        },
      };
    });
}
