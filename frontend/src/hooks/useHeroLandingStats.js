function isVideoSource(src = "") {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

export function useHeroLandingStats({ hero, formData }) {
  return {
    isActive: !!hero?.headline,
    hasImage: !!formData.backgroundImage,
    isVideo: isVideoSource(formData.backgroundImage),
    headlineLength: (formData.headline || "").length,
    focusLength: (formData.focusText || "").length,
    lastUpdated: hero?.updatedAt
      ? new Date(hero.updatedAt).toLocaleDateString()
      : "N/A",
  };
}
