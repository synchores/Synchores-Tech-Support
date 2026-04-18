import { motion } from "motion/react";
import { CalendarDays, MapPin, X } from "lucide-react";

export function DeploymentGalleryLightboxModal({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "var(--landing-overlay)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(8px)",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "48px",
          height: "48px",
          backgroundColor: "var(--landing-surface)",
          border: "1px solid var(--landing-border-strong)",
          borderRadius: "8px",
          color: "#1e7fd4",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 10000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1e7fd4";
          e.currentTarget.style.borderColor = "#1e7fd4";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--landing-surface)";
          e.currentTarget.style.borderColor = "var(--landing-border-strong)";
          e.currentTarget.style.color = "#1e7fd4";
        }}
      >
        <X size={24} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "1200px",
          width: "100%",
          maxHeight: "90vh",
          backgroundColor: "var(--landing-surface)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid var(--landing-border)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            backgroundColor: "var(--landing-surface-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={item.image}
            alt={item.project}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          style={{
            padding: "clamp(20px, 3vw, 32px)",
            borderTop: "1px solid var(--landing-border)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              backgroundColor: "rgba(30, 127, 212, 0.2)",
              border: "1px solid #1e7fd4",
              borderRadius: "4px",
              fontSize: "12px",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              color: "#1e7fd4",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            {item.type}
          </div>
          <h3
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 600,
              color: "var(--landing-text)",
              margin: "0 0 12px 0",
            }}
          >
            {item.project}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "var(--landing-text-muted)",
              margin: "0 0 16px 0",
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "13px",
              color: "var(--landing-text-soft)",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            {item.date && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <CalendarDays size={14} />
                {item.date}
              </span>
            )}
            {item.location && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={14} />
                {item.location}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeploymentGalleryLightboxModal;
