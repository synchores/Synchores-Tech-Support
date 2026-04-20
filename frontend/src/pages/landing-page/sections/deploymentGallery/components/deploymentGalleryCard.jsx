import { useState } from "react";
import { motion } from "motion/react";

export function DeploymentGalleryCard({ item, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "var(--landing-surface)",
        border: "1px solid var(--landing-border)",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? "0 10px 24px rgba(13, 79, 145, 0.14)" : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "75%",
          overflow: "hidden",
          backgroundColor: "var(--landing-surface-soft)",
        }}
      >
        <img
          src={item.image}
          alt={item.project}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            padding: "4px 10px",
            backgroundColor: "rgba(30, 127, 212, 0.9)",
            borderRadius: "4px",
            fontSize: "11px",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            backdropFilter: "blur(4px)",
          }}
        >
          {item.type}
        </div>
      </div>

    </motion.div>
  );
}

export default DeploymentGalleryCard;
