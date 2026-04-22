import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useHeroSection } from "../../../../hooks/useLandingPageData";
import TrueFocus from "../../../../components/layout/landing-contents/ui/TrueFocus";
import SplittingText from "../../../../components/layout/landing-contents/ui/SplittingText";

const FALLBACK_HEADLINE = "Scalable Tech Solutions\nBuilt for your";
const FALLBACK_BACKGROUND = "/videos/tech_consult_vid3.mp4";
const FALLBACK_FOCUS_TEXT = "BUSINESS SUCCESS";
const GRAPHQL_URL =
  import.meta.env.VITE_API_URL || import.meta.env.API_URL || "http://localhost:3000/graphql";

function getBackendOrigin() {
  try {
    return new URL(GRAPHQL_URL).origin;
  } catch {
    return "http://localhost:3000";
  }
}

function isVideoSource(src = "") {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

function resolveMediaSource(src = "") {
  if (!src) return src;

  if (/^(https?:|data:|blob:)/i.test(src)) {
    return src;
  }

  if (src.startsWith("/uploads/")) {
    return `${getBackendOrigin()}${src}`;
  }

  if (src.startsWith("uploads/")) {
    return `${getBackendOrigin()}/${src}`;
  }

  return src;
}

function getMediaType(src = "") {
  const normalized = src.toLowerCase();
  if (normalized.includes(".mp4")) return "video/mp4";
  if (normalized.includes(".ogg")) return "video/ogg";
  if (normalized.includes(".mov")) return "video/quicktime";
  return "video/webm";
}

export default function Home() {
  const { hero } = useHeroSection();
  const navigate = useNavigate();
  const location = useLocation();

  const handleServicesClick = () => {
    if (location.pathname === "/") {
      // Already on landing page, scroll directly
      const element = document.getElementById("offering");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // On a different page, navigate with state
      navigate("/", { state: { scrollTo: "offering" } });
    }
  };

  const handleLearnMoreClick = () => {
    if (location.pathname === "/") {
      // Already on landing page, scroll directly
      const element = document.getElementById("about");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // On a different page, navigate with state
      navigate("/", { state: { scrollTo: "about" } });
    }
  };

  const headline = useMemo(() => {
    const value = hero?.headline?.trim();
    return value || FALLBACK_HEADLINE;
  }, [hero?.headline]);

  const mediaSrc = useMemo(() => {
    const value = hero?.backgroundImage?.trim();
    return resolveMediaSource(value || FALLBACK_BACKGROUND);
  }, [hero?.backgroundImage]);

  const focusText = useMemo(() => {
    const value = hero?.focusText?.trim();
    return value || FALLBACK_FOCUS_TEXT;
  }, [hero?.focusText]);

  const headlineLines = useMemo(() => {
    const normalized = headline.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    if (normalized.length >= 2) {
      return normalized.slice(0, 2);
    }

    if (normalized.length === 1) {
      return [normalized[0]];
    }

    return ["Scalable Tech Solutions", "Built for your"];
  }, [headline]);
  const mediaIsVideo = isVideoSource(mediaSrc);

  return (
    <section
      id="home"
      className="relative w-full h-[550px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--landing-bg)" }}
    >
      {/* Dynamic Background (image/video) */}
      {mediaIsVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={mediaSrc} type={getMediaType(mediaSrc)} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={mediaSrc}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark Overlay - Fixed darkness for video */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      ></div>

      {/* Fadeout Gradient at Bottom - Fixed darkness for video */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
        }}
      ></div>

      {/* Content - 2 Column Grid */}
      <div className="relative z-10 w-full flex items-start md:items-center justify-center px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full max-w-2xl md:max-w-6xl mx-auto items-start md:items-center">
          {/* Left Column - Logo */}
          <div className="flex justify-center items-center order-1 md:order-1">
            <motion.img
              src="/assets/synchores-logo-vertical.png"
              alt="Synchores Logo"
              className="w-full max-w-[200px] sm:max-w-[215px] md:max-w-sm lg:max-w-lg xl:max-w-2xl object-contain"
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>

          {/* Right Column - Text & CTA */}
          <div className="text-white text-center md:text-left order-2 md:order-2">
            <h1
              className="text-[29px] sm:text-[32px] md:text-[36px] lg:text-[43px] xl:text-[58px] 2xl:text-[72px] font-bold mb-3 sm:mb-3.5 md:mb-4 tracking-wide leading-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
            >
              <SplittingText 
                text={headlineLines.join(" ")} 
                type="words"
                delay={0}
                inView={true}
              />
              <br />
              <span className="hidden md:inline">
                <motion.span
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1.6, ease: "easeOut" }}
                >
                  <TrueFocus
                    sentence={focusText}
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#0088ff"
                    glowColor="rgba(0, 136, 255, 0.6)"
                    animationDuration={2.5}
                    pauseBetweenAnimations={2.5}
                  />
                </motion.span>
              </span>
              <span className="md:hidden" style={{ color: "#0088ff" }}>{focusText}</span>
            </h1>
            <div className="flex flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 justify-center md:justify-start mt-4 sm:mt-5 md:mt-6 lg:mt-8">
              <button onClick={handleServicesClick} className="flex-1 bg-[#0055aa] hover:bg-[#003d7a] text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-3xl transition-colors text-xs sm:text-sm md:text-base">
                Services
              </button>
              <button onClick={handleLearnMoreClick} className="flex-1 bg-transparent border-2 border-white hover:bg-white hover:text-[#0055aa] text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-3xl transition-colors text-xs sm:text-sm md:text-base">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Slice at Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-24 translate-y-[10px]"
        style={{
          backgroundColor: "var(--landing-bg-strong)",
          clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
        }}
      ></div>
    </section>
  );
}
