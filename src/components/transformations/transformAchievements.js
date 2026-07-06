export function transformAchievements(achievements, media, language) {
  if (!Array.isArray(achievements)) {
    throw new Error("Achievements data must be an array");
  }

  return achievements
    .filter((achievement) => achievement.visibility)
    .sort((a, b) => a.order - b.order)
    .map((achievement) => {
      const resolvedMedia = (achievement.mediaRefs || [])
        .map((id) => media.find((item) => item.id === id))
        .filter(Boolean);

      return {
        type: "achievement",
        id: achievement.id,
        content: {
          competitionName: achievement.CompetitionName?.[language],
          country: achievement.CompetitionCountry?.[language],
          organizer: achievement.Organizer?.[language],
          date: achievement.date,
          prizes: achievement.PrizesWon?.[language] || [],
          description: achievement.description?.[language],
          media: resolvedMedia.map((m) => ({
            url: m.url,
            alt: m.altText?.[language],
            type: m.type,
          })),
        },
      };
    });
}
