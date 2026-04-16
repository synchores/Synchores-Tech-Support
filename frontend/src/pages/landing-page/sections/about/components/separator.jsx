import { motion } from "motion/react";
import { BLUE_VIVID } from "./constants";

export function Separator({ light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.2 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "28px",
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "40px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.3 }}
        style={{
          height: "3px",
          background: light ? "#ffffff" : BLUE_VIVID,
          borderRadius: "2px",
          overflow: "hidden",
        }}
      />
      {[1, 0.65, 0.35].map((opacity, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
          style={{
            width: i === 0 ? "7px" : i === 1 ? "5px" : "4px",
            height: i === 0 ? "7px" : i === 1 ? "5px" : "4px",
            borderRadius: "50%",
            background: light ? "#ffffff" : BLUE_VIVID,
          }}
        />
      ))}
    </motion.div>
  );
}
