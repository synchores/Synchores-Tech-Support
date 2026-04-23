import { ChevronLeft, ChevronRight } from "lucide-react";

export function DeploymentHeader({ activeIndex, totalCount, onPrev, onNext }) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "56px 16px 32px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <div style={{ width: "28px", height: "2px", background: "#1e7fd4" }} />
          <span
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#1e7fd4",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Deployment Gallery
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron', Arial, sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--landing-text)",
            margin: 0,
            lineHeight: 1.2,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Solutions,
          <br />
          <span style={{ color: "#1e7fd4" }}>Implemented</span>
        </h2>
      </div>

      {/* Counter & Arrows */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 2vw, 16px)",
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron', Arial, sans-serif",
            fontSize: "clamp(11px, 1.5vw, 13px)",
            fontWeight: 700,
            color: "var(--landing-text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")}{" "}
          <span style={{ color: "var(--landing-border-strong)" }}>/</span>{" "}
          {String(totalCount).padStart(2, "0")}
        </span>

        <div style={{ display: "flex", gap: "clamp(6px, 1vw, 8px)" }}>
          <button
            onClick={onPrev}
            style={{
              width: "clamp(32px, 8vw, 40px)",
              height: "clamp(32px, 8vw, 40px)",
              background: "var(--landing-surface)",
              border: "1px solid var(--landing-border-strong)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--landing-btn-text)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e7fd4";
              e.currentTarget.style.borderColor = "#1e7fd4";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.background = "var(--landing-surface)";
              e.currentTarget.style.borderColor = "var(--landing-border-strong)";
              e.currentTarget.style.color = "var(--landing-btn-text)";
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            style={{
              width: "clamp(32px, 8vw, 40px)",
              height: "clamp(32px, 8vw, 40px)",
              background: "var(--landing-surface)",
              border: "1px solid var(--landing-border-strong)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--landing-btn-text)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e7fd4";
              e.currentTarget.style.borderColor = "#1e7fd4";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.background = "var(--landing-surface)";
              e.currentTarget.style.borderColor = "var(--landing-border-strong)";
              e.currentTarget.style.color = "var(--landing-btn-text)";
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
