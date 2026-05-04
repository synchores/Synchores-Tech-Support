export function OfferingTabs({ offerings, activeIndex, onTabClick, progress }) {
  return (
    <div className="w-full flex flex-row gap-3 sm:gap-4 items-center justify-center max-w-6xl mx-auto flex-wrap px-4 sm:px-6 mb-8 mt-4">
      {offerings.map((offering, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={offering.id}
            onClick={() => onTabClick(index)}
            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold transition-all text-sm sm:text-base whitespace-nowrap overflow-hidden border-[1.5px]"
            style={{
              background: "transparent",
              borderColor: isActive ? "#1e7fd4" : "var(--landing-border-strong)",
              cursor: "pointer",
            }}
          >
            {/* BASE LAYER (The 'Unfilled' Text) */}
            <span 
              className="relative z-0 transition-opacity duration-300"
              style={{ 
                color: "#1e7fd4",
                opacity: isActive ? 1 : 0.6
              }}
            >
              {offering.title}
            </span>

            {/* PROGRESS LAYER (The 'Filled' Text Overlay) */}
            <div 
              className="absolute left-0 top-0 h-full bg-[#1e7fd4] overflow-hidden pointer-events-none z-10"
              style={{ 
                width: isActive ? `${progress}%` : "0%",
                transition: isActive ? "width 100ms linear" : "width 0.3s ease"
              }}
            >
              {/* This span must have identical padding/size as the base to align perfectly */}
              <span 
                className="absolute left-0 top-0 h-full flex items-center px-6 sm:px-8 text-white font-bold whitespace-nowrap"
              >
                {offering.title}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
