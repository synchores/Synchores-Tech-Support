import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  deploymentsGalleryData,
  getAllDeploymentTypes,
} from "../deploymentsGalleryData";
import { DeploymentGalleryFilterButton } from "./deploymentGalleryFilterButton";
import { DeploymentGalleryCard } from "./deploymentGalleryCard";
import { DeploymentGalleryLightboxModal } from "./deploymentGalleryLightboxModal";

export function DeploymentGalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const allTypes = getAllDeploymentTypes();

  const filteredDeployments =
    activeFilter === "All"
      ? deploymentsGalleryData
      : deploymentsGalleryData.filter((item) => item.type === activeFilter);

  return (
    <section
      style={{
        backgroundColor: "var(--landing-bg)",
        borderTop: "1px solid var(--landing-border)",
        borderBottom: "1px solid var(--landing-border)",
        padding: "clamp(48px, 8vw, 80px) 0",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 24px)",
          marginBottom: "clamp(32px, 5vw, 48px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "'Orbitron', Arial, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--landing-text)",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Deployment <span style={{ color: "#1e7fd4" }}>Gallery</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "var(--landing-text-muted)",
              margin: 0,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Showcasing our expertise in infrastructure, security, and
            telecommunications solutions
          </p>
        </motion.div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 24px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          <DeploymentGalleryFilterButton
            label="All"
            count={deploymentsGalleryData.length}
            isActive={activeFilter === "All"}
            onClick={() => setActiveFilter("All")}
          />
          {allTypes.map((type) => {
            const count = deploymentsGalleryData.filter(
              (item) => item.type === type,
            ).length;

            return (
              <DeploymentGalleryFilterButton
                key={type}
                label={type}
                count={count}
                isActive={activeFilter === type}
                onClick={() => setActiveFilter(type)}
              />
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "clamp(16px, 2vw, 24px)",
                alignItems: "stretch",
              }}
            >
              {filteredDeployments.map((item, index) => (
                <DeploymentGalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {filteredDeployments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--landing-text-soft)",
            }}
          >
            <p style={{ fontFamily: "'Inter', Arial, sans-serif", fontSize: "16px" }}>
              No deployments found for this category.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <DeploymentGalleryLightboxModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default DeploymentGalleryGrid;
