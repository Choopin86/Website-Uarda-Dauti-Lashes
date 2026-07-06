export function transformTrust(trustHighlights, language) {
  if (!Array.isArray(trustHighlights)) {
    throw new Error("Trust highlights data must be an array");
  }

  return {
    type: "trust",
    content: {
      items: trustHighlights
        .filter((item) => item.visibility)
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          icon: item.icon,
          label: item.label?.[language],
        })),
    },
  };
}
