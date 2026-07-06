export function transformAbout(bio, copy, language) {
  //Build About UI structure
  return {
    type: "about",
    content: {
      eyebrow: copy.eyebrow?.[language],
      heading: copy.heading?.[language],
      paragraphs: bio.shortBio?.[language] || [],
    },
  };
}
