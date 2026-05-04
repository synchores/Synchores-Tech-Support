import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { offerings } from '../data/offeringsData';

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

  const baseUrl = MEDIA_BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : '/' + path;

  // Standard absolute URL construction: 
  // If the path is a local upload, we must ensure it uses the full backend origin.
  // On live host, this will resolve to your production domain.
  // On local, this will resolve to http://localhost:3000.
  if (cleanPath.startsWith('/uploads/')) {
    return `${baseUrl}${cleanPath}`;
  }

  return cleanPath;
}

function splitLines(value = '') {
  return String(value)
    .split(/\r?\n|,/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function toSlug(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolveFeatureFallbackImage(item, index) {
  const slugCandidates = [
    item?.id,
    item?.title,
    item?.displayTitle,
    item?.category
  ]
    .map((value) => toSlug(value || ''))
    .filter(Boolean);

  const matchedTemplate = offerings.find((template) => {
    const templateSlugs = [template.id, template.title, template.displayTitle]
      .map((value) => toSlug(value || ''))
      .filter(Boolean);

    return slugCandidates.some((candidate) => templateSlugs.includes(candidate));
  });

  if (matchedTemplate?.image) {
    return toMediaUrl(matchedTemplate.image);
  }

  if (offerings[index]?.image) {
    return toMediaUrl(offerings[index].image);
  }

  return '/assets/placeholder-service.jpg';
}

function normalizeImageSources(imagePath, fallbackImage) {
  const placeholder = '/assets/placeholder-service.jpg';
  const primary = toMediaUrl(imagePath) || fallbackImage || placeholder;
  const fallback = fallbackImage || placeholder;

  return {
    primary,
    // Ensure fallback is different from primary to avoid looping on same broken URL.
    fallback: primary === fallback ? placeholder : fallback,
    placeholder,
  };
}

export function FeatureCard({ offerings: dynamicOfferings }) {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const syncTheme = () => {
      setIsDarkMode(root.classList.contains('dark'));
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const features = dynamicOfferings?.length
    ? dynamicOfferings.map((item, index) => ({
        id: item.id || `service-${index + 1}`,
        title: item.title || 'UNTITLED SERVICE',
        description:
          item.description || 'Service details will be available soon.',
        fallbackImage: item.fallbackImage || resolveFeatureFallbackImage(item, index),
        image: toMediaUrl(item.image) || item.fallbackImage || resolveFeatureFallbackImage(item, index),
        bullets: splitLines(item.points).length
          ? splitLines(item.points)
          : item.bullets || [item.subtitle || item.description || 'Core business service'],
      }))
    : offerings.map((item, index) => ({
        ...item,
        fallbackImage: resolveFeatureFallbackImage(item, index),
        image: toMediaUrl(item.image) || resolveFeatureFallbackImage(item, index),
      }));

  const renderBulletIcon = () => (
    <div className="mt-1 p-1 rounded-md bg-blue-500/10">
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
        style={{ color: '#0066ff' }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );

  const renderFeatureIcon = (imagePath, fallbackImage, prioritize = false) => {
    const { primary, fallback, placeholder } = normalizeImageSources(imagePath, fallbackImage);

    return (
      <div className="relative w-full h-full group overflow-hidden">
        <img 
          src={primary}
          alt="Feature illustration"
          className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
          loading={prioritize ? 'eager' : 'lazy'}
          fetchPriority={prioritize ? 'high' : 'auto'}
          decoding="async"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          onError={(e) => {
            const currentSrc = e.currentTarget.getAttribute('src') || '';
            if (currentSrc === fallback || currentSrc === placeholder) {
              e.currentTarget.src = placeholder;
              return;
            }
            e.currentTarget.src = fallback;
          }}
        />
        {/* Inner Vignette for Premium Look */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="w-full py-12 sm:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden" style={{ background: "var(--landing-bg)" }}>
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="mb-12 sm:mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0055aa] uppercase">
            Platform Capabilities
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the advanced technological solutions powering our enterprise-grade ecosystem.
          </p>
        </div>

        <ScrollStack
          className="min-h-auto"
          itemDistance={24}
          itemScale={0.05}
          itemStackDistance={12}
          stackPosition="20%"
          scaleEndPosition="5%"
          baseScale={1}
          blurAmount={0}
          useWindowScroll={true}
          staggerCards={true}
        >
          {features.map((feature, idx) => (
            <ScrollStackItem
              key={idx}
              itemClassName="hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{
                backgroundColor: isDarkMode ? '#020b18' : '#ffffff',
                backdropFilter: 'blur(16px)',
                opacity: 1,
                border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,85,170,0.1)",
                borderRadius: '2.5rem'
              }}
            >
              <div className="flex flex-col md:flex-row h-full w-full gap-6 md:gap-12 lg:gap-16">
                {/* Column 2: Image */}
                <div
                  className="w-full md:flex-1 h-56 sm:h-72 md:h-full overflow-hidden order-first md:order-last p-2"
                  onClick={() => navigate(`/offering/${feature.id}`)}
                >
                  {renderFeatureIcon(feature.image, feature.fallbackImage, idx === 0)}
                </div>

                {/* Column 1: Text Content */}
                <div
                  className="flex-1 flex flex-col justify-center min-w-0 p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6"
                  onClick={() => navigate(`/offering/${feature.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#0066ff]" />
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#0066ff]">
                      Advanced Capability
                    </span>
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight break-words uppercase leading-tight"
                    style={{ color: isDarkMode ? '#ffffff' : '#020b18' }}
                  >
                    {feature.title}
                  </h2>
                  
                  <p
                    className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-500 dark:text-gray-400"
                  >
                    {feature.description}
                  </p>
                  
                  <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-white/10 to-transparent" />
                  
                  {feature.bullets && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
                      {feature.bullets.map((bullet, bulletIdx) => {
                        const words = bullet.split(' ');
                        const firstWord = words[0];
                        const restWords = words.slice(1).join(' ');
                        
                        return (
                          <li key={bulletIdx} className="flex items-start gap-3">
                            {renderBulletIcon()}
                            <span
                              className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 pt-0.5 leading-snug"
                            >
                              <span className="font-bold text-gray-900 dark:text-white">{firstWord}</span> {restWords}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <div className="mt-6">
                    <button
                      type="button"
                      className="group flex items-center gap-2 px-6 py-3 bg-[#0066ff] hover:bg-[#0055ee] text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                      Learn More
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
