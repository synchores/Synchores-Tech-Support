import { motion } from "motion/react";
import { deploymentsGalleryData, getDeploymentsByType } from "../deploymentsGalleryData";

export function DeploymentGalleryGrid() {
  const deploymentsByType = getDeploymentsByType();
  const types = Object.keys(deploymentsByType);

  return (
    <section
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid #111",
        borderBottom: "1px solid #111",
        padding: "clamp(48px, 8vw, 80px) 0",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 24px)",
          marginBottom: "clamp(32px, 5vw, 56px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Orbitron', Arial, sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Deployment <span style={{ color: "#1e7fd4" }}>Gallery</span>
        </motion.h2>
      </div>

      {/* Type-Based Columns */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 24px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(24px, 3vw, 40px)",
        }}
      >
        {types.map((type, typeIndex) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: typeIndex * 0.1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2vw, 24px)",
            }}
          >
            {/* Type Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingBottom: "12px",
                borderBottom: "2px solid #1e7fd4",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#4da6ff",
                }}
              />
              <h3
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "clamp(14px, 2vw, 16px)",
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {type}
              </h3>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "12px",
                  color: "#757575",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                ({deploymentsByType[type].length})
              </span>
            </div>

            {/* Items in Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 1.5vw, 16px)",
              }}
            >
              {deploymentsByType[type].map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: "clamp(12px, 2vw, 16px)",
                    backgroundColor: "#111111",
                    border: "1px solid #1a1a1a",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                    e.currentTarget.style.borderColor = "#1e7fd4";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(30, 127, 212, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#111111";
                    e.currentTarget.style.borderColor = "#1a1a1a";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Item Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      marginBottom: "12px",
                      backgroundColor: "#000000",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      style={{
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
                  </div>

                  {/* Item Content */}
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "clamp(13px, 1.8vw, 15px)",
                        fontWeight: 600,
                        color: "#ffffff",
                        margin: "0 0 6px 0",
                      }}
                    >
                      {item.project}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', Arial, sans-serif",
                        fontSize: "clamp(12px, 1.5vw, 13px)",
                        color: "#999999",
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default DeploymentGalleryGrid;
