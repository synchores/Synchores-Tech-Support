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
  const leftSplitRefs = useRef([]);
  const rightMainRefs = useRef([]);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);

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
        // DESKTOP ANIMATION (V18: The Perfected Portal)
        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: () => setStartInnerAnimations(true)
        });

        // --- INITIAL STATE ---
        gsap.set(logoWrapperRef.current, {
          left: "50%", top: "50%", xPercent: -50, yPercent: -50,
          clipPath: "inset(0% 0% 30% 0%)", scale: 0.15, opacity: 0, zIndex: 100
        });
        gsap.set(logoImgRef.current, { filter: "grayscale(100%) brightness(0.6)" });
        
        // Setup Portal elements
        gsap.set([leftSplitRefs.current, rightMainRefs.current], { 
          opacity: 0, autoAlpha: 0, y: 0, yPercent: -50 
        });

        gsap.set(leftSplitRefs.current, { left: "100%", xPercent: 0 });
        gsap.set(rightMainRefs.current, { left: "0%", xPercent: -100 });
        gsap.set(ctaRef.current, { opacity: 0, x: 0, y: 200 });
        
        // --- PHASE 1: The Intro ---
        tl.to(logoWrapperRef.current, { opacity: 1, duration: 0.8 })
          .to(logoWrapperRef.current, { scale: 0.8, duration: 1.5, ease: "expo.out" }, "-=0.4")
          
        // --- PHASE 2: Color Reveal ---
        tl.addLabel("reveal", "+=0.2")
          .to(logoImgRef.current, { filter: "grayscale(0%) brightness(1)", duration: 1 }, "reveal")
          .to(whiteOverlayRef.current, { opacity: 0, duration: 1.2 }, "reveal")
          .to(logoWrapperRef.current, { scale: 1, duration: 1 }, "reveal")

        // --- PHASE 3: Symmetrical Centered Split ---
        tl.addLabel("split", "+=0.3")
          .set([leftSplitRefs.current, rightMainRefs.current.slice(2, 4)], { autoAlpha: 1 })
          
          .to(leftSplitRefs.current[0], { xPercent: -100, x: -110, y: -42.5, opacity: 1, duration: 1.2, ease: "power3.out" }, "split")
          .to(leftSplitRefs.current[1], { xPercent: -100, x: -110, y: 42.5, opacity: 1, duration: 1.2, ease: "power3.out" }, "split+=0.2")
          
          .to(rightMainRefs.current[2], { xPercent: 0, x: 110, y: -42.5, opacity: 1, duration: 1.2, ease: "power3.out" }, "split+=0.4")
          .to(rightMainRefs.current[3], { xPercent: 0, x: 110, y: 42.5, opacity: 1, duration: 1.2, ease: "power3.out" }, "split+=0.6")

        // --- PHASE 4: The Portal Assembly ---
        tl.addLabel("portal", "+=1.5")
          .to(logoWrapperRef.current, { left: "24%", scale: 1.8, duration: 1.6, ease: "power3.inOut" }, "portal")
          
          .to(".left-mask-split", { width: "24%", duration: 1.6, ease: "power3.inOut" }, "portal")
          .to(".right-mask-portal", { left: "40%", width: "60%", duration: 1.6, ease: "power3.inOut" }, "portal")
          
          // Move left elements into the portal illusion
          .to(leftSplitRefs.current, { x: 300, opacity: 0, duration: 1.6, ease: "power3.inOut" }, "portal")
          .to(rightMainRefs.current.slice(0, 2), { autoAlpha: 1, opacity: 1, duration: 0.8 }, "portal+=0.4")

          .to(rightMainRefs.current, {
            xPercent: 0, x: 50, yPercent: 0,
            y: (i) => (i * 85) - 200, 
            duration: 1.6, stagger: 0.05, ease: "power3.inOut"
          }, "portal")
          
          .to(ctaRef.current, { x: 50, y: 220, duration: 1.6, ease: "power3.inOut" }, "portal")

        // --- PHASE 5: Final Polish ---
        tl.addLabel("final", "-=0.2")
          .to(logoWrapperRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "final")
          .to(videoRef.current, { opacity: 1, duration: 1.5 }, "final")
          .to(ctaRef.current, { opacity: 1, duration: 1 }, "final+=0.5")
          .set(".right-mask-portal", { overflow: "visible" });
      });

      mm.add("(max-width: 767px)", () => {
        // MOBILE ANIMATION (Optimized for slant clearance)
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => setStartInnerAnimations(true)
        });

        gsap.set(".left-mask-split", { display: "none" });
        gsap.set(logoWrapperRef.current, { left: "50%", top: "28%", scale: 1.0, opacity: 0, xPercent: -50, yPercent: -50 });
        gsap.set(rightMainRefs.current, { left: "50%", top: "52%", opacity: 0, y: 40, xPercent: -50, autoAlpha: 1 });
        gsap.set(ctaRef.current, { left: "50%", top: "82%", opacity: 0, y: 40, xPercent: -50 });

        tl.to(logoWrapperRef.current, { opacity: 1, scale: 1.15, duration: 1.2, ease: "expo.out" })
          .to(whiteOverlayRef.current, { opacity: 0, duration: 0.8 }, "-=0.8")
          .to(rightMainRefs.current, {
            opacity: 1,
            y: (i) => i * 36,
            duration: 1.0,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.6")
          .to(videoRef.current, { opacity: 1, duration: 1.5 }, "-=1.2")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8");
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
        <div className="relative w-full h-full overflow-hidden">

          {/* Logo Container (The Shield) */}
          <div ref={logoWrapperRef} className="absolute flex flex-col items-center z-[100] pointer-events-none">
            <img
              ref={logoImgRef}
              src="/assets/synchores-logo-vertical.png"
              alt="Synchores"
              className="w-full max-w-[220px] md:max-w-[440px] lg:max-w-[520px] xl:max-w-[580px] object-contain"
            />
          </div>

          {/* Content Stage */}
          <div className="absolute inset-0 z-[50] pointer-events-none">
            
            {/* Left Mask Split (Phase 3 Only) */}
            <div className="left-mask-split absolute left-0 top-0 w-1/2 h-full overflow-hidden">
              {textGroups.slice(0, 2).map((text, i) => (
                <div key={i} ref={el => leftSplitRefs.current[i] = el}
                  className="absolute left-full top-[45%] whitespace-nowrap">
                  <SplittingText text={text}
                    className="uppercase font-bold tracking-tighter text-white text-[24px] md:text-[54px] lg:text-[68px] xl:text-[82px] leading-[1.05]"
                    style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                  />
                </div>
              ))}
            </div>

            {/* Right Mask Portal (Main Assembly) */}
            <div className="right-mask-portal absolute left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden">
              <div className="relative w-full h-full">
                {textGroups.map((text, i) => (
                  <div key={i} ref={el => rightMainRefs.current[i] = el}
                    className="absolute left-0 top-[45%] whitespace-nowrap text-center md:text-left w-full md:w-auto">
                    {i < 3 ? (
                      <SplittingText text={text}
                        className="uppercase font-bold tracking-tighter text-white text-[24px] md:text-[54px] lg:text-[68px] xl:text-[82px] leading-[1.05] inline-block"
                        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                      />
                    ) : (
                      <div className="flex justify-center md:justify-start w-full md:w-auto">
                        <TrueFocus sentence={text} manualMode={!startInnerAnimations}
                          blurAmount={5} borderColor="#0088ff" glowColor="rgba(0, 136, 255, 0.6)"
                          className="text-[#0088ff] font-bold text-[32px] md:text-[68px] lg:text-[84px] xl:text-[98px] uppercase tracking-tighter leading-[1.05] whitespace-nowrap" />
                      </div>
                    )}
                  </div>
                ))}

                <motion.div ref={ctaRef} className="absolute left-0 top-[45%] flex flex-row gap-3 w-full justify-center md:justify-start z-[40]">
                  <button onClick={handleServicesClick}
                    className="bg-[#0055aa] text-white px-8 md:px-14 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg border border-[#4ea8ff]/30 shadow-2xl hover:bg-[#004488] transition-all pointer-events-auto">
                    Services
                  </button>
                  <button onClick={handleLearnMoreClick}
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 md:px-14 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-white hover:text-[#0055aa] transition-all pointer-events-auto">
                    Learn More
                  </button>
                </motion.div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[25] bg-[var(--landing-bg-strong)]"
        style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }}></div>
    </section>
  );
}
