import { motion } from "motion/react";
import { getYouTubeThumbnail } from "../youtubeVideosData";

export function YoutubeVideoCard({ video, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "var(--landing-bg-secondary, rgba(255,255,255,0.05))",
        transition: "all 0.3s ease",
        border: "1px solid var(--landing-border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(30, 127, 212, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail Container */}
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <img
          src={getYouTubeThumbnail(video.videoId)}
          alt={video.title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />

        {/* Play Button Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="white"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "20px",
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--landing-text)",
            lineHeight: "1.4",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {video.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "13px",
            color: "var(--landing-text-soft)",
          }}
        >
          {video.category}
        </p>
      </div>
    </motion.div>
  );
}

export default YoutubeVideoCard;
