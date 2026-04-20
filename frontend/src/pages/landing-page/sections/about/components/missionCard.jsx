import { motion } from "motion/react";
import { BLUE_VIVID } from "./constants";

export function MissionCard({ label, statement }) {
  const missionLabel = label || "Our Mission";
  const missionStatement =
    statement ||
    "Empower organizations through technology that drives efficiency, security, and growth.";

  return (
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
        {missionLabel}
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
        "{missionStatement}"
      </p>
    </motion.div>
  );
}
