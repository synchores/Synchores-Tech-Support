const DEFAULT_WATERMARK_VIDEO = "/videos/fingerprint-scan.mp4";

// "Handler" that safely resolves a watermark video for a slide.
// Supports dynamic slide data by accepting optional fields.
export function resolveWatermarkVideo(slide) {
  if (!slide || typeof slide !== "object") {
    return { src: DEFAULT_WATERMARK_VIDEO, key: DEFAULT_WATERMARK_VIDEO };
  }

  const src =
    typeof slide.watermarkVideo === "string" && slide.watermarkVideo.trim()
      ? slide.watermarkVideo.trim()
      : DEFAULT_WATERMARK_VIDEO;

  // Prefer a stable ID if present so React only reloads
  // when the video source changes for the slide.
  const stableId =
    slide.id != null && (typeof slide.id === "string" || typeof slide.id === "number")
      ? String(slide.id)
      : "unknown";

  return {
    src,
    key: `${stableId}:${src}`,
  };
}
