import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { NAVY, AboutLeftPanel, AboutRightPanel } from "./components";

export function AboutSection({ companyInfo }) {
  const containerRef = useRef(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section
      ref={containerRef}
      id="about"
      style={{
        position: "relative",
        overflow: "hidden", // Prevent parallax overflow
        backgroundColor: NAVY,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
          minHeight: "clamp(560px, 80vh, 840px)",
        }}
        className="about-split"
      >
        <AboutLeftPanel
          eyebrow={companyInfo?.aboutEyebrow}
          heading={companyInfo?.aboutHeading}
          paragraph1={companyInfo?.aboutText}
          paragraph2={companyInfo?.aboutParagraph2 || companyInfo?.whatWeDoParagraph1}
          missionLabel={companyInfo?.missionLabel}
          missionStatement={companyInfo?.missionStatement}
          scrollYProgress={scrollYProgress}
        />
        <AboutRightPanel
          imageSrc={companyInfo?.aboutImage1}
          imageAlt={companyInfo?.aboutImage1Alt}
          scrollYProgress={scrollYProgress}
        />
      </div>

      {/* Responsive stacked styles for mobile */}
      <style>{`
        @media (max-width: 767px) {
          .about-split {
            grid-template-columns: 1fr !important;
          }
          .about-split > div:nth-child(2) {
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;
