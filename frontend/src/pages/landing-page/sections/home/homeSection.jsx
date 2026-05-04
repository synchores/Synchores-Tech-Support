import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { useHeroSection } from "../../../../hooks/useLandingPageData";
import TrueFocus from "../../../../components/layout/landing-contents/ui/TrueFocus";
import SplittingText from "../../../../components/layout/landing-contents/ui/SplittingText";

const FALLBACK_HEADLINE = "Scalable Tech Solutions\nBuilt for your";
const FALLBACK_BACKGROUND = "/videos/tech_consult_vid3.webm";
const FALLBACK_BACKGROUND_WEBM = "/videos/tech_consult_vid3.webm";
const FALLBACK_BACKGROUND_MOBILE = "/videos/FallbackMobile.mp4";
const CLOUDINARY_FALLBACK = "https://res.cloudinary.com/deatv7v89/video/upload/v1713751761/hero_bg_loop_v1_k2v2v8.mp4";
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

function isVideoSource(src = "") {
  if (!src) return false;
  const cleanSrc = src.split("?")[0].split("#")[0];
  return /\.(mp4|webm|ogg|mov)$/i.test(cleanSrc) || src.includes("video/upload");
}

export default function Home() {
  const { hero } = useHeroSection();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });
  const [startInnerAnimations, setStartInnerAnimations] = useState(false);
  const hasPlayedIntroRef = useRef(false);
  const [videoFallbackLevel, setVideoFallbackLevel] = useState(0);

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
  const focusText = useMemo(() => hero?.focusText?.trim() || FALLBACK_FOCUS_TEXT, [hero?.focusText]);

  const fallbackVideoSrc = useMemo(() => resolveMediaSource(isMobileViewport ? FALLBACK_BACKGROUND_MOBILE : FALLBACK_BACKGROUND), [isMobileViewport]);

  const activeVideoSrc = useMemo(() => {
    const cmsSrc = resolveMediaSource(hero?.backgroundImage?.trim());
    
    // Tiered Priority (User Request):
    // 1. Official Local Fallback (Repo)
    // 2. CMS Background (Live)
    // 3. Cloudinary Cinematic Loop (Ultimate Failover)
    const sources = [
      fallbackVideoSrc,
      cmsSrc,
      CLOUDINARY_FALLBACK
    ].filter(Boolean);

    return sources[videoFallbackLevel] || sources[sources.length - 1];
  }, [hero?.backgroundImage, fallbackVideoSrc, videoFallbackLevel]);

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

  // Viewport Sync
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleViewportChange = (e) => setIsMobileViewport(e.matches);
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  // Reset fallback on source change
  useEffect(() => {
    setVideoFallbackLevel(0);
  }, [hero?.backgroundImage]);

  const handleServicesClick = () => {
    document.getElementById("offering")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLearnMoreClick = () => {
    navigate("/learn-more");
  };

  // Splitting headline into the premium 4-line stack (Screenshot 1 parity)
  const textGroups = useMemo(() => {
    return [
      "SCALABLE TECH",
      "SOLUTIONS",
      "BUILT FOR YOUR",
      focusText
    ];
  }, [focusText]);

  // --- STABLE MEDIA ENGINE: Monitor Source Handoff ---
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.tagName === "VIDEO") {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
      
      // Force visibility if animation already finished
      if (hasPlayedIntroRef.current) {
        gsap.set(videoRef.current, { opacity: 1 });
      }
    }
  }, [activeVideoSrc]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // --- UNIFIED CINEMATIC ENGINE (Desktop & Tablet >= 768px) ---
      mm.add("(min-width: 768px)", () => {
        const isSmall = window.innerWidth < 1280;
        
        // Responsive Layout Config (Using Dynamic Units)
        const cfg = {
          introLogoScale: isSmall ? 0.7 : 0.8,
          splitGap: isSmall ? "7vw" : "8vw",
          splitScale: isSmall ? 0.4 : 0.45,
          splitY: isSmall ? "3.5vh" : "4vh",
          portalLogoLeft: isSmall ? "20%" : "24%",
          portalLogoScale: isSmall ? 1.35 : 1.8,
          portalTextScale: isSmall ? 0.75 : 1.0,
          portalTextX: isSmall ? "5vw" : "5vw",
          portalTextYStep: isSmall ? 10 : 12, // Using raw numbers for JS math
          portalTextYOffset: isSmall ? -20 : -24,
          portalCtaY: isSmall ? 22 : 26
        };

        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: () => {
            setStartInnerAnimations(true);
            hasPlayedIntroRef.current = true;
          }
        });

        // Forced Playback ignition
        if (videoRef.current && videoRef.current.tagName === "VIDEO") {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
        }

        // --- PHASE 0: INITIAL STATE (Reset for resilience) ---
        gsap.set(whiteOverlayRef.current, { autoAlpha: hasPlayedIntroRef.current ? 0 : 1, zIndex: 100 });
        gsap.set(".hero-bg-media", { opacity: hasPlayedIntroRef.current ? 1 : 0, zIndex: 5 });
        
        gsap.set(logoWrapperRef.current, {
          left: "50%", top: "50%", xPercent: -50, yPercent: -50,
          clipPath: "inset(0% 0% 25% 0%)", scale: 0.15, opacity: 0, zIndex: 110
        });
        gsap.set(logoImgRef.current, { filter: "grayscale(100%) brightness(0.6)" });
        
        gsap.set(leftSplitRefs.current, { 
          opacity: 0, autoAlpha: 0, left: "100%", xPercent: 0, x: 0, y: 0, yPercent: -50,
          transformOrigin: "right center" 
        });
        gsap.set(rightMainRefs.current, { 
          opacity: 0, autoAlpha: 0, left: "0%", xPercent: -100, x: 0, y: 0, yPercent: -50,
          transformOrigin: "left center" 
        });
        gsap.set(ctaRef.current, { opacity: 0, x: 0, y: "20vh" });
        
        // --- PHASE 1: The Intro ---
        tl.to(logoWrapperRef.current, { opacity: 1, duration: 0.8 })
          .to(logoWrapperRef.current, { scale: cfg.introLogoScale, duration: 1.5, ease: "expo.out" }, "-=0.4")
          
        // --- PHASE 2: Color Reveal ---
        tl.addLabel("reveal", "+=0.2")
          .to(logoImgRef.current, { filter: "grayscale(0%) brightness(1)", duration: 1 }, "reveal")
          .to(whiteOverlayRef.current, { autoAlpha: 0, duration: 1.2 }, "reveal")
          .to(logoWrapperRef.current, { scale: 1, duration: 1 }, "reveal")

        // --- PHASE 3: Symmetrical Centered Split (Anchored) ---
        tl.addLabel("split", "+=0.3")
          .set([leftSplitRefs.current, rightMainRefs.current.slice(2, 4)], { autoAlpha: 1 })
          .to(leftSplitRefs.current[0], { xPercent: -100, x: `-${cfg.splitGap}`, y: `-${cfg.splitY}`, opacity: 1, scale: cfg.splitScale, duration: 1.2, ease: "power3.out" }, "split")
          .to(leftSplitRefs.current[1], { xPercent: -100, x: `-${cfg.splitGap}`, y: cfg.splitY, opacity: 1, scale: cfg.splitScale, duration: 1.2, ease: "power3.out" }, "split+=0.2")
          .to(rightMainRefs.current[2], { xPercent: 0, x: cfg.splitGap, y: `-${cfg.splitY}`, opacity: 1, scale: cfg.splitScale, duration: 1.2, ease: "power3.out" }, "split+=0.4")
          .to(rightMainRefs.current[3], { xPercent: 0, x: cfg.splitGap, y: cfg.splitY, opacity: 1, scale: cfg.splitScale, duration: 1.2, ease: "power3.out" }, "split+=0.6")

        // --- PHASE 4: The Portal Assembly ---
        tl.addLabel("portal", "+=1.5")
          .to(logoWrapperRef.current, { left: cfg.portalLogoLeft, scale: cfg.portalLogoScale, duration: 1.6, ease: "power3.inOut" }, "portal")
          .to(".left-mask-split", { width: cfg.portalLogoLeft, duration: 1.6, ease: "power3.inOut" }, "portal")
          .to(".right-mask-portal", { 
            left: `calc(${cfg.portalLogoLeft} + 12%)`, 
            width: `calc(100% - ${cfg.portalLogoLeft} - 15%)`, 
            duration: 1.6, ease: "power3.inOut" 
          }, "portal")
          
          .to(leftSplitRefs.current, { x: "20vw", opacity: 0, duration: 1.6, ease: "power3.inOut" }, "portal")
          .to(rightMainRefs.current.slice(0, 2), { autoAlpha: 1, opacity: 1, duration: 0.8 }, "portal+=0.4")

          .to(rightMainRefs.current, {
            xPercent: 0, x: cfg.portalTextX, yPercent: 0,
            scale: cfg.portalTextScale,
            y: (i) => (i * cfg.portalTextYStep + cfg.portalTextYOffset) + "vh", 
            duration: 1.6, stagger: 0.05, ease: "power3.inOut"
          }, "portal")
          
          .to(ctaRef.current, { x: cfg.portalTextX, y: cfg.portalCtaY + "vh", duration: 1.6, ease: "power3.inOut" }, "portal")

        tl.addLabel("final", "-=0.2")
          .to(logoWrapperRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.out" }, "final")
          .to(".hero-bg-media", { opacity: 1, duration: 1.5 }, "final")
          .to(ctaRef.current, { opacity: 1, duration: 1 }, "final+=0.5")
          .set(whiteOverlayRef.current, { autoAlpha: 0 })
          .set(".right-mask-portal", { overflow: "visible" });

        if (hasPlayedIntroRef.current) {
          tl.progress(1);
          gsap.set(whiteOverlayRef.current, { autoAlpha: 0 });
        }
      });

      mm.add("(max-width: 767px)", () => {
        // MOBILE ANIMATION
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            setStartInnerAnimations(true);
            hasPlayedIntroRef.current = true;
          }
        });

        if (videoRef.current && videoRef.current.tagName === "VIDEO") {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
        }

        // --- PHASE 0: IMMEDIATE REVEAL (Mobile Only) ---
        gsap.set(whiteOverlayRef.current, { autoAlpha: 0, zIndex: 100 });
        gsap.set(".hero-bg-media", { opacity: 1, zIndex: 5 });
        gsap.set(logoImgRef.current, { filter: "grayscale(100%) brightness(0.6)" });

        gsap.set(".left-mask-split", { display: "none" });
        gsap.set(logoWrapperRef.current, { 
          left: "50%", top: "32%", scale: 0.15, opacity: 0, xPercent: -50, yPercent: -50,
          clipPath: "inset(0% 0% 25% 0%)"
        });
        gsap.set(rightMainRefs.current, { 
          left: "50%", top: "52%", opacity: 0, y: 40, xPercent: -50, yPercent: 0, x: 0,
          transformOrigin: "center center", autoAlpha: 1 
        });
        gsap.set(ctaRef.current, { 
          left: "50%", top: "88%", opacity: 0, y: 40, xPercent: -50, x: 0 
        });

        tl.to(logoWrapperRef.current, { opacity: 1, scale: 0.8, duration: 1.2, ease: "expo.out" })
          .addLabel("reveal", "+=0.2")
          .to(logoImgRef.current, { filter: "grayscale(0%) brightness(1)", duration: 1 }, "reveal")
          .to(logoWrapperRef.current, { scale: 1.1, duration: 1 }, "reveal")
          .to(logoWrapperRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, "reveal+=0.5")
          
          .to(rightMainRefs.current, {
            opacity: 1,
            y: (i) => i * 42,
            duration: 1.0,
            stagger: 0.1,
            ease: "power2.out"
          }, "reveal+=0.3")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
          .set(whiteOverlayRef.current, { autoAlpha: 0 });

        if (hasPlayedIntroRef.current) {
          tl.progress(1);
          gsap.set(whiteOverlayRef.current, { autoAlpha: 0 });
        }
      });

    }, stageRef);
    return () => ctx.revert();
  }, [textGroups]);

  return (
    <section id="home" ref={stageRef} className="relative w-full h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-white">

      {isVideoSource(activeVideoSrc) ? (
        <video 
          ref={videoRef} 
          key={activeVideoSrc}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          poster="/assets/hero-bg-poster.jpg"
          className="hero-bg-media absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none z-[0]"
          onError={() => setVideoFallbackLevel(prev => prev + 1)}
        >
          <source src={activeVideoSrc} type="video/mp4" />
          <source src={FALLBACK_BACKGROUND_WEBM} type="video/webm" />
        </video>
      ) : (
        <img
          ref={videoRef}
          src={activeVideoSrc}
          alt="Hero background"
          className="hero-bg-media absolute inset-0 w-full h-full object-cover z-[0] opacity-0"
          onError={(e) => {
            e.currentTarget.src = "/assets/homeImgFback.jpg";
            setVideoFallbackLevel(prev => prev + 1);
          }}
        />
      )}

      <div className="absolute inset-0 z-[6]" style={{ backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.28)" }}></div>
      <div ref={whiteOverlayRef} className={`absolute inset-0 bg-white z-[100] pointer-events-none ${isMobileViewport ? 'opacity-0' : 'opacity-100'}`}></div>

      <div className="relative z-[20] w-full h-full">
        <div className="relative w-full h-full overflow-hidden">

          {/* Logo Container (The Shield) */}
          <div ref={logoWrapperRef} className="absolute flex flex-col items-center z-[110] pointer-events-none">
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
                    className="uppercase font-bold tracking-tighter text-white text-[40px] md:text-[54px] lg:text-[68px] xl:text-[82px] leading-[1.05]"
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
                    className="absolute left-0 top-[45%] whitespace-nowrap md:whitespace-normal text-center md:text-left w-full md:w-auto px-4 md:px-0">
                    {i < 3 ? (
                      <SplittingText text={text}
                        className="uppercase font-bold tracking-tighter text-white text-[40px] md:text-[54px] lg:text-[68px] xl:text-[82px] leading-[1.05] inline-block"
                        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                      />
                    ) : (
                      <div className="flex justify-center md:justify-start w-full md:w-auto">
                        <TrueFocus sentence={text} manualMode={!startInnerAnimations}
                          blurAmount={5} borderColor="#0088ff" glowColor="rgba(0, 136, 255, 0.6)"
                          className="text-[#0088ff] font-bold text-[40px] md:text-[68px] lg:text-[84px] xl:text-[98px] uppercase tracking-tighter leading-[1.05] whitespace-nowrap" />
                      </div>
                    )}
                  </div>
                ))}

                <motion.div ref={ctaRef} className="absolute left-0 top-[45%] flex flex-row gap-3 w-full justify-center md:justify-start z-[40]">
                  <button onClick={handleServicesClick}
                    className="bg-[#0055aa] hover:bg-[#003d7a] text-white px-8 md:px-14 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg border border-[#4ea8ff]/30 shadow-2xl transition-all pointer-events-auto">
                    Services
                  </button>
                  <button onClick={handleLearnMoreClick}
                    className="bg-transparent border-2 border-white text-white px-8 md:px-14 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-white hover:text-[#0055aa] transition-all pointer-events-auto">
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
