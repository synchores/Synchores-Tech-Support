export function DeploymentImage({ current }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "2px",
          overflow: "hidden",
          minHeight: "clamp(160px, 50vw, 340px)",
          border: "1px solid rgba(255,255,255,0.07)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
      <img
        src={current.image}
        alt={current.project}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          inset: 0,
        }}
      />
      {/* Type badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(30,127,212,0.5)",
          borderRadius: "2px",
          padding: "4px 12px",
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          color: "#1e7fd4",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          backdropFilter: "blur(4px)",
        }}
      >
        {current.type}
      </div>
      </div>
    </div>
  );
}
