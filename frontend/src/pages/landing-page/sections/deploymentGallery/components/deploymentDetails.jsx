import { resolveWatermarkVideo } from "../watermarkVideo";

export function DeploymentDetails({ current, activeIndex, deployments, onGoTo }) {
  const watermarkVideo = resolveWatermarkVideo(current);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0",
        zIndex: 1,
      }}
    >
      {/* Fingerprint video watermark */}
      <div
        style={{
          width: "clamp(170px, 26vw, 260px)",
          height: "clamp(76px, 11vw, 116px)",
          marginBottom: "-8px",
          borderRadius: "4px",
          overflow: "hidden",
          mixBlendMode: "var(--watermark-blend, normal)",
          isolation: "isolate",
        }}
      >
        <video
          src={watermarkVideo.src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "left center",
            filter: "var(--watermark-filter, none)",
            opacity: 0.99,
            transform: "translateZ(0)",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        style={{
          width: "40px",
          height: "2px",
          background: "var(--landing-accent)",
          marginBottom: "20px",
        }}
      />

      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--landing-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          margin: "0 0 10px 0",
        }}
      >
        {current.label}
      </p>

      <h3
        style={{
          fontFamily: "'Orbitron', Arial, sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.4rem)",
          fontWeight: 700,
          color: "var(--landing-text)",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          margin: "0 0 20px 0",
          lineHeight: 1.25,
        }}
      >
        {current.project}
      </h3>

      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "clamp(13px, 1.5vw, 14.5px)",
          color: "var(--landing-text-muted)",
          lineHeight: 1.7,
          margin: "0 0 32px 0",
        }}
      >
        {current.detail}
      </p>

      {/* Dot progress */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {deployments.map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i, i > activeIndex ? 1 : -1)}
            style={{
              width: i === activeIndex ? "24px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background:
                i === activeIndex
                  ? "var(--landing-accent)"
                  : "var(--landing-border-strong)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

    </div>
  );
}
