import { NavigationArrow } from "./NavigationArrow";
import { DotIndicators } from "./DotIndicators";
import { TitleOverlay } from "./TitleOverlay";

export function VideoPlayer({ current, onPrev, onNext, activeIndex, offerings }) {
  return (
    <div className="relative w-full bg-black overflow-hidden">
      {current.video ? (
        <div className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px]">
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
              src={current.video}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>

          <TitleOverlay displayTitle={current.displayTitle} subtitle={current.subtitle} />

          {/* Dark overlay gradients */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)",
            }}
          />

          <NavigationArrow direction="left" onClick={onPrev} />
          <NavigationArrow direction="right" onClick={onNext} />
          <DotIndicators count={offerings.length} activeIndex={activeIndex} onDotClick={(i) => onNext(i)} />
        </div>
      ) : (
        <div className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-800 flex items-center justify-center text-gray-400">
          <p>Video coming soon for {current.title}</p>
        </div>
      )}
    </div>
  );
}
