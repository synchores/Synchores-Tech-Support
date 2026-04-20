import { motion } from "motion/react";
import { X } from "lucide-react";

export function YoutubeVideoLightboxModal({ video, onClose }) {
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--landing-bg)",
          borderRadius: "12px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.8)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.5)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={24} />
        </button>

        {/* Video Container */}
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            backgroundColor: "#000",
            width: "100%",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Video Info */}
        <div style={{ padding: "24px" }}>
          <h2
            style={{
              margin: "0 0 12px 0",
              fontFamily: "'Orbitron', Arial, sans-serif",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 700,
              color: "var(--landing-text)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {video.title}
          </h2>

          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 12px",
                backgroundColor: "var(--landing-accent, #1e7fd4)",
                color: "white",
                borderRadius: "4px",
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {video.category}
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "14px",
              color: "var(--landing-text-muted)",
              lineHeight: 1.6,
            }}
          >
            {video.description}
          </p>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "16px",
              padding: "10px 24px",
              backgroundColor: "var(--landing-accent, #1e7fd4)",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Watch on YouTube
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default YoutubeVideoLightboxModal;
