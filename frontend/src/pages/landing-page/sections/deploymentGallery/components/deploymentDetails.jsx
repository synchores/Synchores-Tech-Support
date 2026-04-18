export function DeploymentDetails({ current, activeIndex, deployments, onGoTo }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0",
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "'Orbitron', Arial, sans-serif",
          fontSize: "clamp(4rem, 8vw, 7rem)",
          fontWeight: 900,
          color: "rgba(30,127,212,0.08)",
          lineHeight: 1,
          marginBottom: "-8px",
          userSelect: "none",
        }}
      >
        {String(activeIndex + 1).padStart(2, "0")}
      </div>

      <div
        style={{
          width: "40px",
          height: "2px",
          background: "#1e7fd4",
          marginBottom: "20px",
        }}
      />

      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          color: "#1e7fd4",
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
                  ? "#1e7fd4"
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
