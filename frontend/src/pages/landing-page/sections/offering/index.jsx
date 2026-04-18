import { useState, useCallback, useEffect, useMemo } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { OfferingTabs } from "./components/OfferingTabs";
import { DescriptionPanel } from "./components/DescriptionPanel";
import { FeatureCard } from "./components/FeatureCard";
import { OFFERINGS_DATA } from "./constants";
import { useLandingServices } from "../../../../hooks/useLandingPageData";
import { offerings as offeringTemplates } from "./data/offeringsData";

function toSlug(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toMediaUrl(path = "") {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith("/uploads/")) return `http://localhost:3000${path}`;
  if (path.startsWith("uploads/")) return `http://localhost:3000/${path}`;
  return path;
}

export default function OfferingSection() {
  const { services } = useLandingServices({ status: "published" });
  const [activeIndex, setActiveIndex] = useState(0);

  const offeringsData = useMemo(() => {
    if (!services?.length) {
      return OFFERINGS_DATA;
    }

    return services.map((service, index) => {
      const slug = toSlug(service.title);
      const fallback = OFFERINGS_DATA.find(
        (item) => toSlug(item.id) === slug || toSlug(item.title) === slug,
      );
      const template = offeringTemplates.find(
        (item) => toSlug(item.id) === slug || toSlug(item.title) === slug,
      );

      return {
        ...(template || fallback || {}),
        id: slug || fallback?.id || `service-${index + 1}`,
        title: service.title || fallback?.title || "UNTITLED SERVICE",
        displayTitle:
          service.title ||
          template?.displayTitle ||
          fallback?.displayTitle ||
          fallback?.title ||
          "UNTITLED SERVICE",
        subtitle:
          service.subtitle ||
          template?.subtitle ||
          fallback?.subtitle ||
          service.category ||
          "Business Solutions",
        description:
          service.longDescription ||
          service.description ||
          template?.longDescription ||
          fallback?.description ||
          "Service details will be available soon.",
        video: toMediaUrl(service.backgroundImage || "") || fallback?.video || "",
        image: toMediaUrl(service.image || "") || template?.image || fallback?.image || "",
        bullets: template?.bullets || fallback?.bullets,
        points: template?.points || fallback?.points,
      };
    });
  }, [services]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (!offeringsData.length) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex > offeringsData.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, offeringsData.length]);

  const prev = () => {
    if (!offeringsData.length) return;
    const newIndex = activeIndex === 0 ? offeringsData.length - 1 : activeIndex - 1;
    goTo(newIndex);
  };

  const next = () => {
    if (!offeringsData.length) return;
    const newIndex = activeIndex === offeringsData.length - 1 ? 0 : activeIndex + 1;
    goTo(newIndex);
  };

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (offeringsData.length <= 1) return undefined;

    const timer = setTimeout(() => {
      next();
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeIndex, offeringsData.length]);

  const current = offeringsData[activeIndex] || offeringsData[0];

  if (!current) {
    return null;
  }

  return (
    <section id="offering" style={{ backgroundColor: "var(--landing-bg)" }} className="w-full overflow-hidden">
      {/* Section Header */}
      <div className="py-12 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0055aa] text-center">
          OFFERINGS
        </h2>
      </div>

      {/* Offering Tabs */}
      <OfferingTabs offerings={offeringsData} activeIndex={activeIndex} onTabClick={goTo} />

      {/* Video Player */}
      <VideoPlayer
        current={current}
        onPrev={prev}
        onNext={next}
        onDotClick={goTo}
        activeIndex={activeIndex}
        offerings={offeringsData}
      />

      {/* Description Panel */}
      <DescriptionPanel description={current.description} />

      {/* Feature Card */}
      <FeatureCard offerings={offeringsData} />
    </section>
  );
}
