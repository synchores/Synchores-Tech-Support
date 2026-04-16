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
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.2,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Our Work,
          <br />
          <span style={{ color: "#1e7fd4" }}>In The Field</span>
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
            color: "#6b7280",
            letterSpacing: "0.1em",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")}{" "}
          <span style={{ color: "#2a2a2a" }}>/</span>{" "}
          {String(totalCount).padStart(2, "0")}
        </span>

        <div style={{ display: "flex", gap: "clamp(6px, 1vw, 8px)" }}>
          <button
            onClick={onPrev}
            style={{
              width: "clamp(32px, 8vw, 40px)",
              height: "clamp(32px, 8vw, 40px)",
              background: "transparent",
              border: "1px solid #2a2a2a",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#a7a7a7",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e7fd4";
              e.currentTarget.style.borderColor = "#1e7fd4";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#a7a7a7";
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            style={{
              width: "clamp(32px, 8vw, 40px)",
              height: "clamp(32px, 8vw, 40px)",
              background: "transparent",
              border: "1px solid #2a2a2a",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#a7a7a7",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e7fd4";
              e.currentTarget.style.borderColor = "#1e7fd4";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.color = "#a7a7a7";
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
