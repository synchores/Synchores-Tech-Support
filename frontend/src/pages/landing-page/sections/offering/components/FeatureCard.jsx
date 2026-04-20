import { useNavigate } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { offerings } from '../data/offeringsData';

function toMediaUrl(path = '') {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/uploads/')) return `http://localhost:3000${path}`;
  if (path.startsWith('uploads/')) return `http://localhost:3000/${path}`;
  return path;
}

function splitLines(value = '') {
  return String(value)
    .split(/\r?\n|,/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function FeatureCard({ offerings: dynamicOfferings }) {
  const navigate = useNavigate();
  const features = dynamicOfferings?.length
    ? dynamicOfferings.map((item, index) => ({
        id: item.id || `service-${index + 1}`,
        title: item.title || 'UNTITLED SERVICE',
        description:
          item.description || 'Service details will be available soon.',
        image: toMediaUrl(item.image) || '/assets/placeholder-service.jpg',
        bullets: splitLines(item.points).length
          ? splitLines(item.points)
          : item.bullets || [item.subtitle || item.description || 'Core business service'],
      }))
    : offerings;

  const renderBulletIcon = () => (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      style={{ color: "var(--landing-text-soft)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
      <path d="M3 6h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"></path>
    </svg>
  );

  const renderFeatureIcon = (imagePath) => {
    return (
      <img 
        src={imagePath} 
        alt="Feature illustration"
        className="w-full h-full object-cover rounded-xl"
        onError={(e) => {
          e.currentTarget.src = '/assets/placeholder-service.jpg';
        }}
      />
    );
  };

  return (
    <div className="w-full py-2 sm:py-4 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden" style={{ background: "linear-gradient(to bottom-right, var(--landing-bg) 0%, var(--landing-bg-strong) 100%)" }}>
      <div className="w-full max-w-[1400px] mx-auto rounded-lg sm:rounded-2xl">
        {/* ScrollStack Features */}
        <ScrollStack
          className="min-h-auto"
          itemDistance={15}
          itemScale={0.04}
          itemStackDistance={10}
          stackPosition="25%"
          scaleEndPosition="5%"
          baseScale={1}
          blurAmount={0}
          useWindowScroll={true}
          staggerCards={true}
        >
          {features.map((feature, idx) => (
            <ScrollStackItem
              key={idx}
              itemClassName="hover:shadow-[0_24px_50px_rgba(12,51,94,0.14)] transition-shadow duration-300 cursor-pointer"
              style={{
                backgroundColor: "var(--card-bg)",
                opacity: 1,
                border: "1px solid var(--landing-border-strong)",
              }}
            >
              <div className="flex flex-col md:flex-row h-full w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                {/* Column 2: Image - Top on mobile, Right on desktop */}
                <div
                  className="w-full md:flex-1 h-56 sm:h-72 md:h-full overflow-hidden order-first md:order-last"
                  onClick={() => navigate(`/offering/${feature.id}`)}
                >
                  {renderFeatureIcon(feature.image)}
                </div>

                {/* Column 1: Text Content - Bottom on mobile, Left on desktop */}
                <div
                  className="flex-1 flex flex-col justify-center min-w-0 p-0 gap-2 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8"
                  onClick={() => navigate(`/offering/${feature.id}`)}
                >
                  <span
                    className="inline-flex w-fit px-3 py-1 text-[10px] sm:text-xs font-bold tracking-[0.14em] uppercase"
                    style={{
                      color: "var(--landing-text)",
                      border: "1px solid var(--landing-border-strong)",
                      background: "var(--landing-surface-soft)",
                    }}
                  >
                    Service {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <h2
                    className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold tracking-wide break-words uppercase"
                    style={{ color: "var(--landing-text)" }}
                  >
                    {feature.title}
                  </h2>
                  <p
                    className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed break-words"
                    style={{ color: "var(--landing-text-muted)" }}
                  >
                    {feature.description}
                  </p>
                  
                  {/* Separator Line */}
                  <div
                    className="my-1 sm:my-3 md:my-4 h-px opacity-90"
                    style={{
                      background: "linear-gradient(to right, var(--landing-border-strong), transparent)",
                    }}
                  ></div>
                  
                  {/* Bullets List */}
                  {feature.bullets && (
                    <ul className="mt-1 sm:mt-3 md:mt-4 space-y-1 sm:space-y-2 md:space-y-3">
                      {feature.bullets.map((bullet, bulletIdx) => {
                        const words = bullet.split(' ');
                        const firstWord = words[0];
                        const restWords = words.slice(1).join(' ');
                        
                        return (
                          <li key={bulletIdx} className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                            {renderBulletIcon()}
                            <span
                              className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg break-words pt-0.5"
                              style={{ color: "var(--landing-text-soft)" }}
                            >
                              <span className="font-bold" style={{ color: "var(--landing-text)" }}>{firstWord}</span> {restWords}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
