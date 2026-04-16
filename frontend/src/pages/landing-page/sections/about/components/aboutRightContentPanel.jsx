import { motion } from "motion/react";
import { NAVY, BLUE_VIVID } from "./constants";
import { Separator } from "./separator";

export function AboutRightContentPanel() {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: NAVY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(48px, 7vw, 100px) clamp(32px, 5vw, 72px)",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Subtle blue corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,127,212,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-left accent */}
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(77,166,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          color: BLUE_VIVID,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          margin: "0 0 14px 0",
        }}
      >
        Why Choose Us
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        style={{
          fontFamily: "'Orbitron', Arial, sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1.1,
          margin: "0 0 0 0",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}
      >
        OUR
        <br />
        <span
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.25)",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundImage: `linear-gradient(135deg, #ffffff 40%, ${BLUE_VIVID} 100%)`,
          }}
        >
          COMMITMENT
        </span>
      </motion.h2>

      <Separator />

      {/* Body copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "clamp(14px, 1.4vw, 16px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.75,
          margin: "0 0 36px 0",
        }}
      >
        We implement{" "}
        <span style={{ color: "#ffffff", fontWeight: 600 }}>
          secure, scalable technologies
        </span>
        —from networking and cloud systems to AI-powered workflows—that streamline operations, boost productivity, and drive sustainable growth.
      </motion.p>

      {/* Value highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{
          marginTop: "40px",
          padding: "18px 22px",
          background: "rgba(30,127,212,0.1)",
          border: "1px solid rgba(77,166,255,0.3)",
          borderLeft: `3px solid ${BLUE_VIVID}`,
          borderRadius: "2px",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            color: BLUE_VIVID,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            margin: "0 0 6px 0",
          }}
        >
          Our Values
        </p>
        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.65,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          "Quality, innovation, and reliability are at the heart of everything we do."
        </p>
      </motion.div>
    </div>
  );
}
