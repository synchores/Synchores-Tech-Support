import { useNavigate } from 'react-router-dom';
import { NavigationArrow } from "./NavigationArrow";
import { DotIndicators } from "./DotIndicators";
import { TitleOverlay } from "./TitleOverlay";

function toMediaUrl(path = '') {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/uploads/')) return `http://localhost:3000${path}`;
  if (path.startsWith('uploads/')) return `http://localhost:3000/${path}`;
  return path;
}

export function VideoPlayer({ current, onPrev, onNext, onDotClick, activeIndex, offerings }) {
  const navigate = useNavigate();
  const videoSrc = toMediaUrl(current?.video);
  const imageSrc = toMediaUrl(current?.image);

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: "var(--landing-bg-strong)" }}>
      {videoSrc ? (
        <div
          className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] cursor-pointer"
          onClick={() => navigate(`/offering/${current.id}`)}
        >
          <div
            key={current.id}
            className="w-full h-full transition-opacity duration-500 ease-in-out"
            style={{
              opacity: 1,
              animation: "fadeIn 0.8s ease-in-out",
            }}
          >
            <style>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
            <video
              src={videoSrc}
              autoPlay
              loop
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          <TitleOverlay displayTitle={current.displayTitle} subtitle={current.subtitle} />

          {/* Soft overlay gradients - Fixed darkness for video */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(7,35,68,0.35) 0%, rgba(7,35,68,0.08) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(10,74,136,0.25) 0%, transparent 55%)",
            }}
          />

          <div onClick={(e) => e.stopPropagation()}>
            <NavigationArrow direction="left" onClick={onPrev} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <NavigationArrow direction="right" onClick={onNext} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DotIndicators
              count={offerings.length}
              activeIndex={activeIndex}
              onDotClick={onDotClick}
            />
          </div>
        </div>
      ) : imageSrc ? (
        <div
          className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] cursor-pointer"
          onClick={() => navigate(`/offering/${current.id}`)}
        >
          <img
            src={imageSrc}
            alt={current.title || 'Service image'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/assets/placeholder-service.jpg';
            }}
          />

          <TitleOverlay displayTitle={current.displayTitle} subtitle={current.subtitle} />

          {/* Soft overlay gradients - Fixed darkness for image */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(7,35,68,0.35) 0%, rgba(7,35,68,0.08) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(10,74,136,0.25) 0%, transparent 55%)",
            }}
          />

          <div onClick={(e) => e.stopPropagation()}>
            <NavigationArrow direction="left" onClick={onPrev} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <NavigationArrow direction="right" onClick={onNext} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DotIndicators
              count={offerings.length}
              activeIndex={activeIndex}
              onDotClick={onDotClick}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-800 flex items-center justify-center text-gray-400">
          <p>Video coming soon for {current.title}</p>
        </div>
      )}
    </div>
  );
}
