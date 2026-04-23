

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;


function getMediaPreviewSrc(path) {
  return `${IMAGE_URL}${path}`;
}

export function HeroLandingPreviewCard({ formData, isVideo }) {
  return (
    <div className="w-full lg:w-5/12">
      <div
        className="h-full rounded-lg border shadow-sm overflow-hidden"
        style={{
          backgroundColor: "#f8fafc",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="h-full"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <div className="relative h-64 flex items-center">
            {formData.backgroundImage &&
              (isVideo ? (
                <video
                  src={getMediaPreviewSrc(formData.backgroundImage)}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={getMediaPreviewSrc(formData.backgroundImage)}
                  alt="Hero background preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            <div
              className="absolute inset-0"
              style={{
                background: formData.backgroundImage
                  ? "linear-gradient(to bottom, rgba(3,2,19,0.15), rgba(3,2,19,0.85))"
                  : "var(--primary)",
                opacity: 1,
              }}
            />
            <div className="relative w-full px-6 py-5 space-y-3">
              <p
                style={{
                  fontSize: "12px",
                  letterSpacing: 0.05,
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                }}
              >
                Hero preview
              </p>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--primary-foreground)",
                }}
              >
                {formData.headline || "Your headline will appear here"}
                <br />
                {formData.focusText || "BUSINESS SUCCESS"}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--primary-foreground)",
                  opacity: 0.9,
                }}
              >
                {formData.tagline ||
                  "Use this area to preview how your landing page hero copy will look to visitors."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroLandingPreviewCard;
