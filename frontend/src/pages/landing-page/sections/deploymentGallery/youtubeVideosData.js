/* ─── YouTube Videos Data ───────────────────────────────────────── */

export const youtubeVideosData = [
  {
    id: 1,
    videoId: "-K_Z-RWfyEc",
    title: "Network Infrastructure Setup",
    category: "Network & Infrastructure",
    description: "Learn about enterprise network infrastructure setup and configuration.",
    url: "https://www.youtube.com/watch?v=-K_Z-RWfyEc",
  },
  {
    id: 2,
    videoId: "R-HEkj-sbkA",
    title: "Network Infrastructure Optimization",
    category: "Network & Infrastructure",
    description: "Advanced techniques for optimizing network infrastructure performance.",
    url: "https://www.youtube.com/watch?v=R-HEkj-sbkA",
  },
  // Add more videos as needed
];

/**
 * Get unique video categories
 */
export const getAllVideoCategories = () => {
  const categories = new Set(youtubeVideosData.map((video) => video.category));
  return Array.from(categories).sort();
};

/**
 * Get YouTube thumbnail URL
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - 'maxres' (default), 'hq', or 'sd'
 */
export const getYouTubeThumbnail = (videoId, quality = "maxres") => {
  const qualityMap = {
    maxres: "maxresdefault",
    hq: "hqdefault",
    sd: "sddefault",
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};
