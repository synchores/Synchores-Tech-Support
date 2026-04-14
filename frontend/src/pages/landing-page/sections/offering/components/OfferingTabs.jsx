export function OfferingTabs({ offerings, activeIndex, onTabClick }) {
  return (
    <div className="w-full hidden lg:flex flex-row gap-3 sm:gap-4 items-center justify-center max-w-5xl mx-auto flex-wrap px-4 sm:px-6 mb-8">
      {offerings.map((offering, index) => (
        <button
          key={offering.id}
          onClick={() => onTabClick(index)}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base whitespace-nowrap"
          style={{
            background: "transparent",
            border: activeIndex === index ? "1.5px solid #1e7fd4" : "1.5px solid #d0d0d0",
            color: activeIndex === index ? "#1e7fd4" : "#888888",
            fontWeight: activeIndex === index ? 700 : 500,
            cursor: "pointer",
          }}
        >
          {offering.title}
        </button>
      ))}
    </div>
  );
}
