export function OfferingTabs({ offerings, activeIndex, onTabClick, progress }) {
  return (
    <div className="w-full flex flex-row gap-3 sm:gap-4 items-center justify-center max-w-6xl mx-auto flex-wrap px-4 sm:px-6 mb-8 mt-4">
      {offerings.map((offering, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={offering.id}
            onClick={() => onTabClick(index)}
            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base whitespace-nowrap overflow-hidden"
            style={{
              background: "transparent",
              border: isActive
                ? "1.5px solid #1e7fd4"
                : `1.5px solid var(--landing-border-strong)`,
              color: isActive ? "#ffffff" : "var(--landing-text-soft)", // Text white when active to contrast with fill
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {/* The Timer Fill Background (Inside the Pill) */}
            <div 
              className="absolute left-0 top-0 h-full bg-[#1e7fd4] transition-all ease-linear z-0"
              style={{ 
                width: isActive ? `${progress}%` : "0%",
                opacity: isActive ? 1 : 0,
                transition: isActive ? "width 100ms linear" : "opacity 0.3s ease"
              }}
            />

            {/* Label - Relative to stay above fill */}
            <span className="relative z-10">
              {offering.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
