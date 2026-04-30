import { useState, useCallback, useEffect, useMemo } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { OfferingTabs } from "./components/OfferingTabs";
import { DescriptionPanel } from "./components/DescriptionPanel";
import { FeatureCard } from "./components/FeatureCard";
import { OFFERINGS_DATA } from "./constants";
import { useLandingServices } from "../../../../hooks/useLandingPageData";
import { offerings as offeringTemplates } from "./data/offeringsData";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const GRAPHQL_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL;

function getMediaBaseUrl() {
  if (IMAGE_URL) {
    return IMAGE_URL.replace(/\/$/, "");
  }

  try {
    return new URL(GRAPHQL_URL).origin;
  } catch {
    return "http://localhost:3000";
  }
}

const MEDIA_BASE_URL = getMediaBaseUrl();

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
  if (path.startsWith("/uploads/")) return `${MEDIA_BASE_URL}${path}`;
  if (path.startsWith("uploads/")) return `${MEDIA_BASE_URL}/${path}`;
  return path;
}

export default function OfferingSection() {
  const { services } = useLandingServices({ status: "published" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    setIsTransitioning(true);
    setActiveIndex(index);
    setProgress(0);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 800);
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

  // Auto-advance Engine with Progress Tracking
  useEffect(() => {
    if (offeringsData.length <= 1) return undefined;

    const duration = 5000; // 5 seconds per slide
    const interval = 50; // Update every 50ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
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
      <OfferingTabs offerings={offeringsData} activeIndex={activeIndex} onTabClick={goTo} progress={progress} />

      {/* Video Player */}
      <VideoPlayer
        offerings={offeringsData}
        activeIndex={activeIndex}
        onPrev={prev}
        onNext={next}
        onDotClick={goTo}
        isTransitioning={isTransitioning}
      />

      {/* Description Panel */}
      <DescriptionPanel description={current.description} />

      {/* Feature Card */}
      <FeatureCard offerings={offeringsData} />
    </section>
  );
}
