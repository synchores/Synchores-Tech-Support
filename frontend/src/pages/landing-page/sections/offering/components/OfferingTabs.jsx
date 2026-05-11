export function OfferingTabs({ offerings, activeIndex, onTabClick, progress }) {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 mb-8 mt-4">
      {offerings.map((offering, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={offering.id}
            onClick={() => onTabClick(index)}
            className="group relative w-full sm:w-auto sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold transition-all text-[12px] sm:text-base whitespace-nowrap overflow-hidden border-[1.5px] flex items-center justify-center"
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
              className="absolute left-0 top-0 w-full h-full bg-[#1e7fd4] pointer-events-none z-10 flex items-center justify-center"
              style={{ 
                clipPath: isActive ? `inset(0 ${100 - progress}% 0 0)` : "inset(0 100% 0 0)",
                transition: isActive ? "clip-path 100ms linear" : "clip-path 0.3s ease"
              }}
            >
              <span className="text-white font-bold whitespace-nowrap">
                {offering.title}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
