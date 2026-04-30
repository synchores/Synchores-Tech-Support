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
  const containerHeight = "h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] xl:h-[850px]";
  
  // Use a fixed percentage for predictable math
  const slideWidthPercent = 75; 

  return (
    <div className="relative w-full overflow-hidden py-12" style={{ backgroundColor: "var(--landing-bg-strong)" }}>
      {/* Main Sliding Track */}
      <div 
        className={`relative flex items-center ${containerHeight} transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]`}
        style={{ 
          width: `${offerings.length * slideWidthPercent}%`,
          transform: `translateX(calc(50vw - ${(activeIndex * slideWidthPercent) + (slideWidthPercent / 2)}vw))`,
          // Using vw for the outer calc to ensure it anchors to the viewport center, not the track center
        }}
      >
        {offerings.map((item, index) => {
          const videoSrc = toMediaUrl(item?.video);
          const imageSrc = toMediaUrl(item?.image);
          const isCurrent = activeIndex === index;

          return (
            <div 
              key={item.id} 
              className={`relative h-full px-3 sm:px-6 cursor-pointer transition-all duration-1000 ease-out ${
                isCurrent ? "opacity-100 scale-100 z-10" : "opacity-25 scale-[0.82] grayscale-[30%] z-0"
              }`}
              style={{ width: `${100 / offerings.length}%` }}
              onClick={() => navigate(`/offering/${item.id}`)}
            >
              {/* Media & Overlay Container (Clipped) */}
              <div className={`relative w-full h-full rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-1000 ${
                isCurrent ? "shadow-[#0055aa]/20" : "shadow-none"
              }`}>
                {/* Media Layer */}
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
                      className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${isCurrent ? 'scale-100' : 'scale-115'}`}
                    />
                  ) : (
                    <img
                      src={imageSrc || '/assets/placeholder-service.jpg'}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${isCurrent ? 'scale-100' : 'scale-115'}`}
                    />
                  )}
                </div>

                {/* Vignette Layer - Inside Clip */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10 pointer-events-none transition-opacity duration-1000 ${
                  isCurrent ? "opacity-100" : "opacity-0"
                }`} />

                {/* Text Overlay - Inside Clip */}
                <div className={`absolute inset-0 flex flex-col justify-end p-10 sm:p-16 md:p-20 z-20 transition-all duration-1000 delay-300 ${
                  isCurrent && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}>
                  <TitleOverlay displayTitle={item.displayTitle} subtitle={item.subtitle} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Static UI (Fade Only, No Movement) */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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
