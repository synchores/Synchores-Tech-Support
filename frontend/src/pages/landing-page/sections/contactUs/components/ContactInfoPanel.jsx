import { motion } from "motion/react";

export default function ContactInfoPanel({ introText, contactInfo, hours }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          color: "var(--landing-text-muted)",
          lineHeight: 1.67,
          margin: "0 0 40px 0",
        }}
      >
        {introText}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {contactInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--landing-border-strong)",
                borderRadius: "2px",
                backgroundColor: "var(--landing-surface)",
              }}
            >
              <Icon size={16} color="#1e7fd4" />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#1e7fd4",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  margin: "0 0 4px 0",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--landing-text-muted)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            color: "#1e7fd4",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            margin: "0 0 16px 0",
          }}
        >
          BUSINESS HOURS
        </p>
        {hours.map(({ day, hours: hoursValue }) => (
          <div
            key={day}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid var(--landing-border)",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "14px",
                color: "var(--landing-text-muted)",
              }}
            >
              {day}
            </span>
            <span
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "14px",
                color: "var(--landing-text-soft)",
                fontWeight: 700,
              }}
            >
              {hoursValue}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
