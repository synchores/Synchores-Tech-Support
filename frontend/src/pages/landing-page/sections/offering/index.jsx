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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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

  const next = useCallback(() => {
    if (offeringsData.length <= 1) return;
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setActiveIndex((current) => (current + 1) % offeringsData.length);
      setIsTransitioning(false);
    }, 500);
  }, [offeringsData.length]);

  const prev = useCallback(() => {
    if (offeringsData.length <= 1) return;
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setActiveIndex((current) =>
        current === 0 ? offeringsData.length - 1 : current - 1,
      );
      setIsTransitioning(false);
    }, 500);
  }, [offeringsData.length]);

  const goTo = useCallback(
    (index) => {
      if (index === activeIndex || offeringsData.length <= 1) return;
      setIsTransitioning(true);
      setProgress(0);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 500);
    },
    [activeIndex, offeringsData.length],
  );

  // Auto-advance Engine with Progress Tracking
  useEffect(() => {
    if (offeringsData.length <= 1) return undefined;

    const duration = 7500; // 7.5 seconds per slide
    const interval = 50; // Update every 50ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, offeringsData.length, next]);

  const current = offeringsData[activeIndex] || offeringsData[0];

  if (!current) {
    return null;
  }

  return (
    <section id="offering" style={{ backgroundColor: "var(--landing-bg)", position: "relative" }} className="w-full">
      {/* Section Header */}
      <div className="py-12 px-4 sm:px-6">
        <h2 
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-center transition-colors duration-300"
          style={{ color: isDarkMode ? "#ffffff" : "#0055aa" }}
        >
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
