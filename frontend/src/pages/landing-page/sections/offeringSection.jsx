import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OfferingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const offerings = [
    { 
      id: 1, 
      title: "Network Infrastructure & Deployment", 
      color: "#008B99",
      video: "/videos/itinfa_vid_lowqual.mp4",
      description: "We design, deploy, and maintain enterprise-grade network infrastructure — from LAN/WAN architecture to wireless systems. Built for performance at every layer.",
    },
    { 
      id: 2, 
      title: "Software and Web Development", 
      color: "#6B7280",
      video: "/videos/tech_consult_vid3.mp4", // Add video path when available
      description: "From bespoke enterprise applications to responsive web platforms, our development team builds solutions that align with your business processes.",
    },
    { 
      id: 3, 
      title: "Tech Consultancy", 
      color: "#6B7280",
      video: "/videos/webdev_vid3.mp4", // Add video path when available
      description: "Our consultants bridge the gap between technology and business goals. From IT roadmaps to digital transformation strategies.",
    },
  ];

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setActiveIndex(index);
  }, []);

  const prev = () => {
    const newIndex = activeIndex === 0 ? offerings.length - 1 : activeIndex - 1;
    goTo(newIndex, -1);
  };

  const next = () => {
    const newIndex = activeIndex === offerings.length - 1 ? 0 : activeIndex + 1;
    goTo(newIndex, 1);
  };

  const current = offerings[activeIndex];

  return (
    <section id="offering" className="w-full overflow-hidden">
      {/* Offering Introduction */}
      <div className="py-12 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0055aa] text-center">
          OFFERINGS
        </h2>
      </div>

      {/* Offerings Buttons - Only on lg and above */}
      <div className="w-full hidden lg:flex flex-row gap-3 sm:gap-4 items-center justify-center max-w-5xl mx-auto flex-wrap px-4 sm:px-6 mb-8">
        {offerings.map((offering, index) => (
          <button
            key={offering.id}
            onClick={() => goTo(index)}
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

      {/* Video Carousel */}
      <div className="relative w-full bg-black overflow-hidden">
        {/* Video Container */}
        {current.video ? (
          <div className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px]">
            <video
              key={current.id}
              src={current.video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
            {/* Dark overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)",
              }}
            />

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded flex items-center justify-center text-white transition-all z-10"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1e7fd4";
                e.currentTarget.style.borderColor = "#1e7fd4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded flex items-center justify-center text-white transition-all z-10"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1e7fd4";
                e.currentTarget.style.borderColor = "#1e7fd4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 right-6 flex gap-1.5 z-10">
              {offerings.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === activeIndex ? "#1e7fd4" : "rgba(255,255,255,0.35)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-800 flex items-center justify-center text-gray-400">
            <p>Video coming soon for {current.title}</p>
          </div>
        )}
      </div>

      {/* Description Panel */}
      <div className="bg-black px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            {current.description}
          </p>
        </div>
      </div>
    </section>
  );
}
