import { motion } from "motion/react";
import { NAVY, BLUE_VIVID } from "./constants";
import { Separator } from "./separator";
import { MissionCard } from "./missionCard";

export function AboutLeftPanel({
  eyebrow,
  heading,
  paragraph1,
  paragraph2,
  missionLabel,
  missionStatement,
}) {
  const aboutHeadingText = (heading || "ABOUT SYNCHORES").trim();
  const headingParts = aboutHeadingText.includes("\n")
    ? aboutHeadingText.split("\n").map((part) => part.trim()).filter(Boolean)
    : aboutHeadingText.split(" ").map((part) => part.trim()).filter(Boolean);
  const headingTop = headingParts[0] || "ABOUT";
  const headingBottom = headingParts.slice(1).join(" ") || "SYNCHORES";

  const aboutParagraph1 =
    paragraph1 ||
    "Synchores I.T. Solutions is a full-service technology company dedicated to empowering organizations through innovative, reliable, and scalable IT solutions.";
  const aboutParagraph2 =
    paragraph2 ||
    "We deliver tailored digital solutions that help small and medium enterprises thrive in an increasingly competitive landscape.";

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
          left: "-80px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,127,212,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-right accent */}
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-60px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(77,166,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* WHO WE ARE eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "13.2px",
          fontWeight: 700,
          color: BLUE_VIVID,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          margin: "0 0 14px 0",
        }}
      >
        {eyebrow || "Who We Are"}
      </motion.p>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        style={{
          fontFamily: "'Orbitron', Arial, sans-serif",
          fontSize: "clamp(2.4rem, 4.8vw, 3.6rem)",
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1.1,
          margin: "0 0 0 0",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}
      >
        {headingTop}
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
          {headingBottom}
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
          fontSize: "clamp(16.8px, 1.68vw, 19.2px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.82)",
          lineHeight: 1.75,
          margin: "0 0 12px 0",
        }}
      >
        {aboutParagraph1}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.38 }}
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "clamp(15.6px, 1.44vw, 17.4px)",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.75,
          margin: "0 0 36px 0",
        }}
      >
        {aboutParagraph2}
      </motion.p>

      {/* Mission floating card */}
      <MissionCard label={missionLabel} statement={missionStatement} />
    </div>
  );
}
