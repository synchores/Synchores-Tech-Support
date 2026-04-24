import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { deployments } from "../deploymentsData";
import { DeploymentHeader } from "./deploymentHeader";
import { DeploymentImage } from "./deploymentImage";
import { DeploymentDetails } from "./deploymentDetails";

export function DeploymentCarousel() {
  const TRANSITION_DURATION_SECONDS = 3;
  const AUTOPLAY_INTERVAL_MS = 7000;
  const RESUME_AUTOPLAY_DELAY_MS = 7000;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const goTo = (index, dir) => {
    if (isAnimating || index === activeIndex) return;

    setDirection(dir);
    setIsAnimating(true);
    setActiveIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), RESUME_AUTOPLAY_DELAY_MS);
  };

  const prev = () => {
    const newIndex = activeIndex === 0 ? deployments.length - 1 : activeIndex - 1;
    goTo(newIndex, -1);
  };

  const next = () => {
    const newIndex = activeIndex === deployments.length - 1 ? 0 : activeIndex + 1;
    goTo(newIndex, 1);
  };

  useEffect(() => {
    if (!autoplay || isAnimating) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === deployments.length - 1 ? 0 : prevIndex + 1
      );
      setDirection(1);
      setIsAnimating(true);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [autoplay, isAnimating]);



  const current = deployments[activeIndex];

  return (
    <section
      style={{
        backgroundColor: "var(--landing-bg)",
        borderTop: "1px solid var(--landing-border)",
        borderBottom: "1px solid var(--landing-border)",
      }}
    >
      <DeploymentHeader
        activeIndex={activeIndex}
        totalCount={deployments.length}
        onPrev={prev}
        onNext={next}
      />

      {/* Main carousel area */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 80 }}
            transition={{ duration: TRANSITION_DURATION_SECONDS, ease: "easeInOut" }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 clamp(16px, 3vw, 24px) clamp(48px, 6vw, 72px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                alignItems: "stretch",
              }}
            >
              <DeploymentImage current={current} />
              <DeploymentDetails
                current={current}
                activeIndex={activeIndex}
                deployments={deployments}
                onGoTo={goTo}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Discover More Button */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px 32px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/deployments')}
          style={{
            padding: "clamp(10px, 2vw, 12px) clamp(24px, 4vw, 32px)",
            backgroundColor: "#4da6ff",
            color: "#0c1e3b",
            border: "none",
            borderRadius: "4px",
            fontSize: "clamp(12px, 2vw, 14px)",
            fontWeight: "600",
            fontFamily: "'Rajdhani', sans-serif",
            cursor: "pointer",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1e7fd4";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4da6ff";
            e.currentTarget.style.color = "#0c1e3b";
          }}
        >
          Discover More
        </motion.button>
      </div>
    </section>
  );
}

export default DeploymentCarousel;
