export function DescriptionPanel({ description }) {
  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12" style={{ backgroundColor: "var(--landing-bg)", borderTop: "1px solid var(--landing-border)", borderBottom: "1px solid var(--landing-border)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--landing-text-muted)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
