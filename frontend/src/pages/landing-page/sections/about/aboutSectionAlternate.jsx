import { NAVY, SECOND_ABOUT_IMG, AboutLeftImagePanel, AboutRightContentPanel } from "./components";

export function AboutSectionAlternate({ companyInfo }) {
  return (
    <section
      id="about-alternate"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: NAVY,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
          minHeight: "clamp(560px, 80vh, 840px)",
        }}
        className="about-split-alternate"
      >
        <AboutLeftImagePanel
          imageSrc={companyInfo?.aboutImage2 || SECOND_ABOUT_IMG}
          imageAlt={companyInfo?.aboutImage2Alt}
        />
        <AboutRightContentPanel
          eyebrow={companyInfo?.commitmentEyebrow}
          heading={companyInfo?.commitmentHeading}
          statement={companyInfo?.commitmentStatement || companyInfo?.whatWeDoParagraph2}
          valuesLabel={companyInfo?.valuesLabel}
          valuesStatement={companyInfo?.valuesStatement}
        />
      </div>

      {/* Responsive stacked styles for mobile */}
      <style>{`
        @media (max-width: 767px) {
          .about-split-alternate {
            grid-template-columns: 1fr !important;
          }
          .about-split-alternate > div:nth-child(1) {
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default AboutSectionAlternate;
