import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { useHeroSection } from "../../../../hooks/useLandingPageData";
import TrueFocus from "../../../../components/layout/landing-contents/ui/TrueFocus";
import SplittingText from "../../../../components/layout/landing-contents/ui/SplittingText";

const FALLBACK_HEADLINE = "Scalable Tech Solutions\nBuilt for your";
const FALLBACK_BACKGROUND = "/videos/tech_consult_vid3.webm";
const FALLBACK_FOCUS_TEXT = "BUSINESS SUCCESS";
const GRAPHQL_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL;

function getBackendOrigin() {
  try {
    return new URL(GRAPHQL_URL).origin;
  } catch {
    return "http://localhost:3000";
  }
}

function resolveMediaSource(src = "") {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  if (src.startsWith("/uploads/") || src.startsWith("uploads/")) {
    const cleanSrc = src.startsWith("/") ? src : `/${src}`;
    return `${getBackendOrigin()}${cleanSrc}`;
  }
  return src;
}

export default function Home() {
  const { hero } = useHeroSection();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [startInnerAnimations, setStartInnerAnimations] = useState(false);

  // Animation Refs
  const stageRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const logoImgRef = useRef(null);
  const whiteOverlayRef = useRef(null);
  const textGroupRefs = useRef([]);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const rightColumnRef = useRef(null);

  // Data Resolution
  const headline = useMemo(() => hero?.headline?.trim() || FALLBACK_HEADLINE, [hero?.headline]);
  const mediaSrc = useMemo(() => resolveMediaSource(hero?.backgroundImage?.trim() || FALLBACK_BACKGROUND), [hero?.backgroundImage]);
  const focusText = useMemo(() => hero?.focusText?.trim() || FALLBACK_FOCUS_TEXT, [hero?.focusText]);

  // Theme Sync
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleServicesClick = () => {
    if (location.pathname === "/") {
      document.getElementById("offering")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: "offering" } });
    }
  };

  const handleLearnMoreClick = () => {
    if (location.pathname === "/") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: "about" } });
    }
  };

  // Splitting headline into the 4 requested groups
  const textGroups = useMemo(() => {
    const lines = headline.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const line1Words = (lines[0] || "Scalable Tech Solutions").split(" ");

    return [
      line1Words.slice(0, 2).join(" "), // "Scalable Tech"
      line1Words.slice(2).join(" "),     // "Solutions Built"
      lines[1] || "for your",             // "for your"
      focusText                           // "Business Success"
    ];
  }, [headline, focusText]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // DESKTOP ANIMATION
        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: () => setStartInnerAnimations(true)
        });

        // INITIAL STATE: Absolute Center Lock
        gsap.set(logoWrapperRef.current, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          clipPath: "inset(0% 0% 45% 0%)"
        });
        gsap.set(logoImgRef.current, { filter: "grayscale(100%) brightness(0.4)", scale: 0.4, opacity: 0 });
        gsap.set(textGroupRefs.current, { opacity: 0, x: 0, y: 0 });
        gsap.set(ctaRef.current, { opacity: 0, y: 40 });
        gsap.set(rightColumnRef.current, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          opacity: 0
        });

        // PHASE 1: The Mark Only (Small & Gray & CENTERED)
        tl.to(logoImgRef.current, { opacity: 1, duration: 1.2 })
          .to(logoImgRef.current, {
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.5)"
          }, "+=0.2")

        // PHASE 2: Color Reveal + Expand to Full Logo (STILL CENTERED)
        tl.to(logoImgRef.current, { filter: "grayscale(0%) brightness(1)", duration: 0.8 })
          .to(logoWrapperRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, "-=0.2")
          .to(whiteOverlayRef.current, { opacity: 0, duration: 1 }, "-=0.4")

        // HOLD AT CENTER: Give user time to see the full logo centered
        tl.addLabel("centered_hold", "+=1.0")

        // PHASE 3: Centrifugal Split (From Absolute Center)
        tl.addLabel("split", "centered_hold")
          .to(textGroupRefs.current[0], { x: "-160%", opacity: 1, duration: 0.8 }, "split")
          .to(textGroupRefs.current[1], { x: "-160%", y: 55, opacity: 1, duration: 0.8 }, "split+=0.1")
          .to(textGroupRefs.current[2], { x: "160%", opacity: 1, duration: 0.8 }, "split")
          .to(textGroupRefs.current[3], { x: "160%", y: 55, opacity: 1, duration: 0.8 }, "split+=0.1")

        // PHASE 4: The Portal Shift (Logo to Left, Text to Right)
        tl.addLabel("portal", "+=0.2")
          .to(logoWrapperRef.current, { left: "28%", scale: 2, duration: 1.2, ease: "power3.inOut" }, "portal")
          .to(rightColumnRef.current, { left: "65%", opacity: 1, duration: 1.2, ease: "power3.inOut" }, "portal")
          .to(textGroupRefs.current, {
            x: 0,
            y: (i) => i * 65,
            duration: 1.2,
            stagger: 0.05,
            ease: "power2.inOut"
          }, "portal")

        // PHASE 5: Final Polish
        tl.to(videoRef.current, { opacity: 1, duration: 1.5 }, "-=1")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=1.2");
      });

      mm.add("(max-width: 767px)", () => {
        // MOBILE ANIMATION
        const tl = gsap.timeline({ onComplete: () => setStartInnerAnimations(true) });
        gsap.set([logoImgRef.current, textGroupRefs.current, ctaRef.current], { opacity: 0, y: 20 });
        tl.to(logoImgRef.current, { opacity: 1, y: 0, duration: 1 })
          .to(whiteOverlayRef.current, { opacity: 0, duration: 0.5 }, "-=0.5")
          .to(textGroupRefs.current, { opacity: 1, y: (i) => i * 40, duration: 0.6, stagger: 0.1 })
          .to(videoRef.current, { opacity: 1, duration: 1 }, "-=0.5")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      });

    }, stageRef);
    return () => ctx.revert();
  }, [textGroups]);

  return (
    <section id="home" ref={stageRef} className="relative w-full h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-white">

      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none">
        <source src={mediaSrc} type="video/webm" />
      </video>

      <div className="absolute inset-0 z-[1]" style={{ backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.25)" }}></div>
      <div ref={whiteOverlayRef} className="absolute inset-0 bg-white z-[50] pointer-events-none"></div>

      <div className="relative z-[20] w-full h-full">

        {/* Stage Container */}
        <div className="relative w-full h-full">

          {/* Logo Container (Absolute Viewport Centered) */}
          <div ref={logoWrapperRef} className="absolute flex flex-col items-center z-[30] pointer-events-none">
            <img
              ref={logoImgRef}
              src="/assets/synchores-logo-vertical.png"
              alt="Synchores"
              className="w-full max-w-[200px] md:max-w-[480px] lg:max-w-[580px] xl:max-w-[650px] object-contain"
            />
          </div>

          {/* Right Column Container (Moves in Phase 4) */}
          <div ref={rightColumnRef} className="absolute flex flex-col items-center md:items-start min-h-[300px] md:min-h-[450px] w-full md:w-auto">
            <div className="relative">
              {textGroups.map((text, i) => (
                <div key={i} ref={el => textGroupRefs.current[i] = el}
                  className="absolute left-0 right-0 md:right-auto overflow-hidden text-center md:text-left py-1 whitespace-nowrap">
                  {i < 3 ? (
                    <SplittingText text={text}
                      className="uppercase font-bold tracking-tighter text-white text-[24px] md:text-[38px] lg:text-[48px] xl:text-[58px] leading-none"
                      style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                    />
                  ) : (
                    <TrueFocus sentence={text} manualMode={!startInnerAnimations}
                      blurAmount={5} borderColor="#0088ff" glowColor="rgba(0, 136, 255, 0.6)"
                      className="text-[#0088ff] font-bold text-[32px] md:text-[52px] lg:text-[64px] xl:text-[76px] uppercase tracking-tighter leading-none" />
                  )}
                </div>
              ))}
            </div>

            <motion.div ref={ctaRef} className="flex flex-row gap-4 mt-12 md:mt-[300px] lg:mt-[360px] w-full justify-center md:justify-start z-[40]">
              <button onClick={handleServicesClick}
                className="bg-[#0055aa] text-white px-8 md:px-12 py-3.5 rounded-full font-bold text-sm md:text-lg border border-[#4ea8ff]/30 shadow-2xl hover:bg-[#004488] transition-all">
                Services
              </button>
              <button onClick={handleLearnMoreClick}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 md:px-12 py-3.5 rounded-full font-bold text-sm md:text-lg hover:bg-white hover:text-[#0055aa] transition-all">
                Learn More
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[25] bg-[var(--landing-bg-strong)]"
        style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }}></div>
    </section>
  );
}
