import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { youtubeVideosData } from "../youtubeVideosData";
import { YoutubeVideoCard } from "./youtubeVideoCard";
import { YoutubeVideoLightboxModal } from "./youtubeVideoLightboxModal";

export function YoutubeVideosGrid({ activeFilter }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const ITEMS_PER_PAGE = 4; // 2 columns × 2 rows

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredVideos =
    activeFilter === "All"
      ? youtubeVideosData
      : youtubeVideosData.filter((video) => video.category === activeFilter);

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVideos = filteredVideos.slice(
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
            {activeFilter === "All" ? "Video " : ""}<span style={{ color: "#1e7fd4" }}>
              {activeFilter === "All" ? "Library" : activeFilter}
            </span>
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
            Watch our latest project demonstrations and technical guides
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
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "clamp(16px, 2vw, 24px)",
                alignItems: "stretch",
              }}
            >
              {paginatedVideos.map((video, index) => (
                <YoutubeVideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  onClick={() => setSelectedVideo(video)}
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
            >
              ← Previous
            </button>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
            >
              Next →
            </button>
          </motion.div>
        )}

        {filteredVideos.length === 0 && (
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
              No videos found for this category.
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <YoutubeVideoLightboxModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default YoutubeVideosGrid;
