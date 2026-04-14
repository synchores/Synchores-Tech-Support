import { useState, useCallback, useEffect } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { OfferingTabs } from "./components/OfferingTabs";
import { DescriptionPanel } from "./components/DescriptionPanel";
import { FeatureCard } from "./components/FeatureCard";
import { OFFERINGS_DATA } from "./constants";

export default function OfferingSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const prev = () => {
    const newIndex = activeIndex === 0 ? OFFERINGS_DATA.length - 1 : activeIndex - 1;
    goTo(newIndex);
  };

  const next = () => {
    const newIndex = activeIndex === OFFERINGS_DATA.length - 1 ? 0 : activeIndex + 1;
    goTo(newIndex);
  };

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      next();
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const current = OFFERINGS_DATA[activeIndex];

  return (
    <section id="offering" className="w-full overflow-hidden">
      {/* Section Header */}
      <div className="py-12 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0055aa] text-center">
          OFFERINGS
        </h2>
      </div>

      {/* Offering Tabs */}
      <OfferingTabs offerings={OFFERINGS_DATA} activeIndex={activeIndex} onTabClick={goTo} />

      {/* Video Player */}
      <VideoPlayer
        current={current}
        onPrev={prev}
        onNext={next}
        activeIndex={activeIndex}
        offerings={OFFERINGS_DATA}
      />

      {/* Feature Card */}
      <FeatureCard />

      {/* Description Panel */}
      <DescriptionPanel description={current.description} />
    </section>
  );
}
