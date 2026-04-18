import { motion } from "motion/react";

export function DeploymentGalleryFilterButton({
  label,
  count,
  isActive,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        padding: "12px 24px",
        backgroundColor: isActive ? "#1e7fd4" : "var(--landing-surface)",
        border: `1px solid ${isActive ? "#1e7fd4" : "var(--landing-border-strong)"}`,
        borderRadius: "6px",
        color: isActive ? "#ffffff" : "var(--landing-btn-text)",
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--landing-surface-soft)";
          e.currentTarget.style.borderColor = "#9ab5d2";
          e.currentTarget.style.color = "var(--landing-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "var(--landing-surface)";
          e.currentTarget.style.borderColor = "var(--landing-border-strong)";
          e.currentTarget.style.color = "var(--landing-btn-text)";
        }
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontSize: "12px",
          opacity: 0.7,
        }}
      >
        ({count})
      </span>
    </motion.button>
  );
}

export default DeploymentGalleryFilterButton;
