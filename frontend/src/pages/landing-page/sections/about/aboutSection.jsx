import { NAVY, AboutLeftPanel, AboutRightPanel } from "./components";

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        overflow: "hidden",
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
        <AboutLeftPanel />
        <AboutRightPanel />
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

