import { motion } from "motion/react";
import { TEAM_CODING_IMG } from "./constants";


const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
export function AboutRightPanel({ imageSrc, imageAlt }) {
  const resolvedImageSrc = imageSrc
    ? imageSrc.startsWith("/uploads/")
      ? `${IMAGE_URL}${imageSrc}`
      : imageSrc
    : TEAM_CODING_IMG;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "400px",
      }}
    >
      {/* Image reveal wipe */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.15,
        }}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <img
          src={resolvedImageSrc}
          alt={imageAlt || "Synchores team"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Blue-tinted overlay to blend with the navy panel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(12,30,59,0.75) 0%, rgba(12,30,59,0.1) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(12,30,59,0.6) 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
