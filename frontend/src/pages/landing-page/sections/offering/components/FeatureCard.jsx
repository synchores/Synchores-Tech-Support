import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { offerings as defaultOfferings } from '../data/offeringsData';

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const GRAPHQL_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL;

/**
 * HELPER: resolve backend media origin
 */
function getMediaBaseUrl() {
  if (IMAGE_URL) return IMAGE_URL.replace(/\/$/, '');
  try {
    return new URL(GRAPHQL_URL).origin;
  } catch {
    return 'http://localhost:3000';
  }
}

const MEDIA_BASE_URL = getMediaBaseUrl();

/**
 * HELPER: Convert path to absolute backend URL
 */
function toMediaUrl(path = '') {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const baseUrl = MEDIA_BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  if (cleanPath.startsWith('/uploads/')) return `${baseUrl}${cleanPath}`;
  return cleanPath;
}

/**
 * HELPER: Robustly split lines from strings or use arrays
 */
function getBulletPoints(item) {
  if (Array.isArray(item.points) && item.points.length > 0) return item.points;
  if (typeof item.points === 'string' && item.points.trim()) {
    const lines = item.points.split(/\r?\n|,/).map(l => l.trim()).filter(Boolean);
    if (lines.length > 0) return lines;
  }
  if (Array.isArray(item.bullets) && item.bullets.length > 0) return item.bullets;
  return [];
}

function toSlug(value = '') {
  return String(value).trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * HELPER: Resolve the correct image or fallback for a service
 */
function resolveFeatureFallbackImage(item, index) {
  const offerings = defaultOfferings;
  const slugCandidates = [item?.id, item?.title, item?.displayTitle, item?.category]
    .map((v) => toSlug(v || '')).filter(Boolean);

  const matchedTemplate = offerings.find((template) => {
    const templateSlugs = [template.id, template.title, template.displayTitle]
      .map((v) => toSlug(v || '')).filter(Boolean);
    return slugCandidates.some((candidate) => templateSlugs.includes(candidate));
  });

  if (matchedTemplate?.image) return toMediaUrl(matchedTemplate.image);
  if (offerings[index]?.image) return toMediaUrl(offerings[index].image);
  return '/assets/offer_devgal_1.png';
}

/**
 * SUB-COMPONENT: MediaLayer
 */
function MediaLayer({ feature, index, total, scrollYProgress, activeIndex }) {
  const start = index / total;
  const end = (index + 0.2) / total;

  const clipPathValue = useTransform(
    scrollYProgress,
    [start, end],
    index === 0 ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: index,
        clipPath: index < activeIndex ? 'inset(0% 0% 0% 0%)' : index === activeIndex ? clipPathValue : 'inset(100% 0% 0% 0%)'
      }}
    >
      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent" />
    </motion.div>
  );
}

export function FeatureCard({ offerings: dynamicOfferings }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const features = (dynamicOfferings?.length ? dynamicOfferings : defaultOfferings).map((item, index) => {
    const localMatch = defaultOfferings.find(d => d.id === item.id || toSlug(d.title) === toSlug(item.title)) || defaultOfferings[index];
    const cmsBullets = getBulletPoints(item);
    const finalBullets = cmsBullets.length >= 3 ? cmsBullets : (localMatch?.points || localMatch?.bullets || []);

    return {
      id: item.id || `service-${index + 1}`,
      title: item.title || localMatch?.title || 'UNTITLED SERVICE',
      description: item.description || localMatch?.description || '',
      image: toMediaUrl(item.image) || resolveFeatureFallbackImage(item, index),
      bullets: finalBullets,
      subtitle: item.subtitle || localMatch?.subtitle || 'Expert solutions for your growth'
    };
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.floor(latest * features.length), features.length - 1);
      if (index !== activeIndex) setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, features.length]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollDistance = totalHeight - viewportHeight;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const progress = (index + 0.5) / features.length;
    const scrollPosition = sectionStart + (progress * scrollDistance);

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  const renderBulletIcon = () => (
    <svg
      className="w-4 h-4 flex-shrink-0 mt-0.5"
      style={{ color: isDarkMode ? '#60a5fa' : '#0066ff' }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${features.length * 100}vh`, position: 'relative' }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-20 md:pt-12 z-20">
        <div
          className="relative w-full max-w-[1500px] h-[85vh] md:h-[720px] mx-4 sm:mx-8 md:mx-12 lg:mx-16 rounded-[30px] md:rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
          style={{
            backgroundColor: isDarkMode ? 'var(--card-bg)' : '#d8efff',
            border: "1px solid var(--landing-border-strong)",
            position: 'relative'
          }}
        >
          {/* LEFT CONTENT */}
          <div
            className="flex-[1.2] md:flex-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10 overflow-hidden"
            style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="flex flex-col h-full justify-between py-1 md:py-4"
              >
                <div className="flex flex-col gap-2 md:gap-5">
                  <div className="w-fit px-3 py-1 rounded-full text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',
                      color: isDarkMode ? '#93c5fd' : '#052a4d',
                      border: "1px solid rgba(0,102,255,0.15)"
                    }}
                  >
                    Capability {activeIndex + 1}
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase"
                    style={{ color: isDarkMode ? '#fff' : '#052a4d' }}
                  >
                    {features[activeIndex].title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-xl font-medium leading-relaxed max-w-xl opacity-90 line-clamp-3 md:line-clamp-none"
                    style={{ color: isDarkMode ? '#cbd5e1' : '#0d3f72' }}
                  >
                    {features[activeIndex].description}
                  </p>

                  <div className="w-full h-px bg-[#0066ff]/10 my-1 md:my-2"></div>

                  <ul className="space-y-1.5 md:space-y-3">
                    {features[activeIndex].bullets.slice(0, 3).map((bullet, i) => {
                      const words = bullet.split(' ');
                      return (
                        <li key={i} className="flex items-start gap-2 md:gap-3">
                          {renderBulletIcon()}
                          <span className="text-xs sm:text-sm md:text-lg lg:text-xl pt-0.5" style={{ color: isDarkMode ? '#cbd5e1' : '#0d3f72' }}>
                            <span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#052a4d' }}>{words[0]}</span> {words.slice(1).join(' ')}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-4 md:mt-8 flex items-center">
                  <button onClick={() => navigate(`/offering/${features[activeIndex].id}`)}
                    className="px-6 py-3 md:px-10 md:py-5 bg-[#0066ff] hover:bg-[#0055ee] text-white rounded-xl font-black text-sm md:text-lg transition-all duration-300 shadow-xl shadow-blue-500/20 flex items-center gap-2 group"
                  >
                    Deep Dive
                    <svg className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT MEDIA */}
          <div className="flex-[0.8] md:flex-1 relative overflow-hidden bg-[#000]/5 border-t md:border-t-0 md:border-l border-[#0066ff]/10">
            {features.map((feature, index) => (
              <MediaLayer key={index} feature={feature} index={index} total={features.length} scrollYProgress={scrollYProgress} activeIndex={activeIndex} />
            ))}
          </div>
        </div>

        {/* DOTS (HIDDEN ON VERY SMALL SCREENS) */}
        <div className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
          {features.map((_, i) => (
            <button key={i} onClick={() => scrollToCard(i)} className="group relative flex items-center justify-center p-1.5 md:p-2">
              <motion.div className="w-2 md:w-3 rounded-full"
                animate={{ height: activeIndex === i ? 24 : 8, backgroundColor: activeIndex === i ? "#0066ff" : "rgba(59, 130, 246, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
