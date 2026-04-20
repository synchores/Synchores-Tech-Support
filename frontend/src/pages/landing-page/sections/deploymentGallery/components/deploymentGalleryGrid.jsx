import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  deploymentsGalleryData,
  getAllDeploymentTypes,
} from "../deploymentsGalleryData";
import { youtubeVideosData } from "../youtubeVideosData";
import { DeploymentGalleryFilterButton } from "./deploymentGalleryFilterButton";
import { DeploymentGalleryCard } from "./deploymentGalleryCard";
import { DeploymentGalleryLightboxModal } from "./deploymentGalleryLightboxModal";

export function DeploymentGalleryGrid({ activeFilter, setActiveFilter }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const allTypes = getAllDeploymentTypes();
  const ITEMS_PER_PAGE = 8; // 4 columns × 2 rows

  // Helper function to get total count (deployments + videos)
  const getTotalCount = (type) => {
    const deploymentCount = deploymentsGalleryData.filter(
      (item) => item.type === type
    ).length;
    const videoCount = youtubeVideosData.filter(
      (video) => video.category === type
    ).length;
    return deploymentCount + videoCount;
  };

  const getTotalAllCount = () => {
    return deploymentsGalleryData.length + youtubeVideosData.length;
  };

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredDeployments =
    activeFilter === "All"
      ? deploymentsGalleryData
      : deploymentsGalleryData.filter((item) => item.type === activeFilter);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredDeployments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDeployments = filteredDeployments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
          {isMobile ? (
            // Mobile: Dropdown filter with icon
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <select
                value={activeFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                style={{
                  padding: "10px 36px 10px 16px",
                  backgroundColor: "transparent",
                  color: "var(--landing-text)",
                  border: "2px solid var(--landing-border)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  appearance: "none",
                  paddingRight: "36px",
                }}
              >
                <option value="All">All ({getTotalAllCount()})</option>
                {allTypes.map((type) => (
                  <option key={type} value={type}>
                    {type} ({getTotalCount(type)})
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--landing-text)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          ) : (
            // Desktop: Button filters
            <>
              <DeploymentGalleryFilterButton
                label="All"
                count={getTotalAllCount()}
                isActive={activeFilter === "All"}
                onClick={() => handleFilterChange("All")}
              />
              {allTypes.map((type) => {
                return (
                  <DeploymentGalleryFilterButton
                    key={type}
                    label={type}
                    count={getTotalCount(type)}
                    isActive={activeFilter === type}
                    onClick={() => handleFilterChange(type)}
                  />
                );
              })}
            </>
          )}
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
                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                gap: "clamp(16px, 2vw, 24px)",
                alignItems: "stretch",
              }}
            >
              {paginatedDeployments.map((item, index) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              marginTop: "clamp(32px, 5vw, 48px)",
            }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  currentPage === 1
                    ? "transparent"
                    : "var(--landing-accent, #1e7fd4)",
                color: currentPage === 1
                  ? "var(--landing-text-soft)"
                  : "white",
                border: `2px solid ${currentPage === 1
                  ? "var(--landing-text-soft)"
                  : "var(--landing-accent, #1e7fd4)"}`,
                borderRadius: "4px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.target.style.opacity = "0.8";
                  e.target.style.transform = "translateX(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.target.style.opacity = "1";
                  e.target.style.transform = "translateX(0)";
                }
              }}
            >
              ← Previous
            </button>

            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: "36px",
                    height: "36px",
                    padding: 0,
                    backgroundColor:
                      currentPage === page
                        ? "var(--landing-accent, #1e7fd4)"
                        : "transparent",
                    color:
                      currentPage === page
                        ? "white"
                        : "var(--landing-text)",
                    border:
                      currentPage === page
                        ? "2px solid var(--landing-accent, #1e7fd4)"
                        : "2px solid var(--landing-text)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) {
                      e.target.style.backgroundColor = "var(--landing-accent, #1e7fd4)";
                      e.target.style.color = "white";
                      e.target.style.borderColor = "var(--landing-accent, #1e7fd4)";
                      e.target.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== page) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "var(--landing-text)";
                      e.target.style.borderColor = "var(--landing-text)";
                      e.target.style.transform = "scale(1)";
                    }
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  currentPage === totalPages
                    ? "transparent"
                    : "var(--landing-accent, #1e7fd4)",
                color: currentPage === totalPages
                  ? "var(--landing-text-soft)"
                  : "white",
                border: `2px solid ${currentPage === totalPages
                  ? "var(--landing-text-soft)"
                  : "var(--landing-accent, #1e7fd4)"}`,
                borderRadius: "4px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.opacity = "0.8";
                  e.target.style.transform = "translateX(2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.opacity = "1";
                  e.target.style.transform = "translateX(0)";
                }
              }}
            >
              Next →
            </button>
          </motion.div>
        )}

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
