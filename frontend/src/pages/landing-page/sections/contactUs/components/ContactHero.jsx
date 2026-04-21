export default function ContactHero({ contactBg, contactBgAlt, eyebrow, heading }) {
  return (
    <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
      <img
        src={contactBg}
        alt={contactBgAlt}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,74,136,0.16) 0%, var(--landing-bg-strong) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#1e7fd4",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              margin: "0 0 12px 0",
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', Arial, sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--landing-text)",
              lineHeight: 1.25,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {heading}
          </h2>
        </div>
      </div>
    </div>
  );
}
