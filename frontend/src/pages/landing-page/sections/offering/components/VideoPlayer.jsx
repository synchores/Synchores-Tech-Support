import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { NavigationArrow } from "./NavigationArrow";
import { DotIndicators } from "./DotIndicators";
import { TitleOverlay } from "./TitleOverlay";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const GRAPHQL_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL;

function getMediaBaseUrl() {
  if (IMAGE_URL) {
    return IMAGE_URL.replace(/\/$/, '');
  }

  try {
    return new URL(GRAPHQL_URL).origin;
  } catch {
    return 'http://localhost:3000';
  }
}

const MEDIA_BASE_URL = getMediaBaseUrl();

function toMediaUrl(path = '') {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/uploads/')) return `${MEDIA_BASE_URL}${path}`;
  if (path.startsWith('uploads/')) return `${MEDIA_BASE_URL}/${path}`;
  return path;
}

export function VideoPlayer({ offerings, activeIndex, onPrev, onNext, onDotClick, isTransitioning }) {
  const navigate = useNavigate();
  const containerHeight = "h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px]";
  
  // Use a fixed percentage for predictable math - widened to 85%
  const slideWidthPercent = 85; 

  return (
    <div className="relative w-full overflow-hidden py-8" style={{ backgroundColor: "var(--landing-bg-strong)" }}>
      {/* Main Sliding Track - Pure Flex, No calculated width to avoid rounding drift */}
      <div 
        className={`relative flex items-center ${containerHeight} transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]`}
        style={{ 
          transform: `translateX(calc(50vw - ${(activeIndex * slideWidthPercent) + (slideWidthPercent / 2)}vw))`,
        }}
      >
        {offerings.map((item, index) => {
          const videoSrc = toMediaUrl(item?.video);
          const imageSrc = toMediaUrl(item?.image);
          const isCurrent = activeIndex === index;

          return (
            <div 
              key={item.id} 
              className={`relative h-full px-3 sm:px-6 cursor-pointer transition-all duration-1000 ease-out flex-shrink-0 ${
                isCurrent ? "opacity-100 scale-100 z-10" : "opacity-30 scale-[0.85] grayscale-[20%] z-0"
              }`}
              style={{ width: `${slideWidthPercent}vw` }}
              onClick={() => navigate(`/offering/${item.id}`)}
            >
              {/* Media & Shadow Container (Self-Contained Clipping) */}
              <div className={`relative w-full h-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 ${
                isCurrent ? "shadow-[#0055aa]/20" : "shadow-none"
              }`}>
                {/* 1. Media Layer */}
                <div className="absolute inset-0 z-0">
                  {videoSrc ? (
                    <video
                      src={videoSrc}
                      autoPlay
                      loop
                      playsInline
                      muted
                      preload="auto"
                      poster={imageSrc || '/assets/placeholder-service.jpg'}
                      className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${isCurrent ? 'scale-100' : 'scale-110'}`}
                    />
                  ) : (
                    <img
                      src={imageSrc || '/assets/placeholder-service.jpg'}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${isCurrent ? 'scale-100' : 'scale-110'}`}
                    />
                  )}
                </div>

                {/* 2. Persistent Shadow Layer - Moves with card, doesn't flicker with text */}
                <div 
                  className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000`}
                  style={{ 
                    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 30%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 25%)",
                    opacity: isCurrent ? 1 : 0.6 // Keep some shadow on neighbors for depth
                  }}
                />

                {/* 3. Text Overlay Layer - Performs the Fade-Up ONLY */}
                <div className={`absolute inset-0 flex flex-col justify-start z-20 pointer-events-none transition-all duration-700 ${
                  isCurrent && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                  <div className="pointer-events-auto">
                    <TitleOverlay displayTitle={item.displayTitle} subtitle={item.subtitle} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Static UI (Fade Only, No Movement) */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-700 z-30 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="pointer-events-auto">
          <NavigationArrow direction="left" onClick={onPrev} />
          <NavigationArrow direction="right" onClick={onNext} />
        </div>

        <div className="pointer-events-auto absolute bottom-16 left-1/2 -translate-x-1/2">
          <DotIndicators
            count={offerings.length}
            activeIndex={activeIndex}
            onDotClick={onDotClick}
          />
        </div>
      </div>
    </div>
  );
}
