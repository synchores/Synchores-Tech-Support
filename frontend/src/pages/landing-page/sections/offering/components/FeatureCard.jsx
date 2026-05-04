import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { offerings as defaultOfferings } from '../data/offeringsData';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

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

function CardLayout({ feature, index, isDarkMode }) {
  const navigate = useNavigate();

  const renderBulletIcon = () => (
    <svg
      className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5 md:mt-1"
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
      className="w-full h-full flex flex-col md:flex-row overflow-hidden relative"
      style={{
        backgroundColor: isDarkMode ? 'var(--card-bg)' : '#f0f9ff',
        borderRadius: 'inherit'
      }}
    >
      {/* LEFT CONTENT */}
      <div className="flex-[1.2] md:flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-10 flex flex-col justify-between relative z-10">
        <div className="flex flex-col gap-3 md:gap-4">
          <div
            className="w-fit px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase"
            style={{
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,102,255,0.08)',
              color: isDarkMode ? '#93c5fd' : '#0066ff',
              border: '1px solid rgba(0,102,255,0.15)'
            }}
          >
            Capability 0{index + 1}
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.1] uppercase"
            style={{ 
              color: isDarkMode ? '#fff' : '#052a4d',
              fontFamily: 'var(--font-outfit), sans-serif'
            }}
          >
            {feature.title}
          </h2>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-lg font-medium leading-relaxed max-w-xl opacity-80"
            style={{ color: isDarkMode ? '#cbd5e1' : '#0d3f72' }}
          >
            {feature.description}
          </p>

          <div className="w-full h-px bg-[#0066ff]/10 my-1"></div>

          <ul className="space-y-2 md:space-y-2">
            {feature.bullets.slice(0, 3).map((bullet, i) => {
              const words = bullet.split(' ');
              return (
                <li key={i} className="flex items-start gap-2 md:gap-3">
                  {renderBulletIcon()}
                  <span
                    className="text-xs sm:text-sm md:text-base lg:text-base"
                    style={{ color: isDarkMode ? '#cbd5e1' : '#0d3f72' }}
                  >
                    <span className="font-bold" style={{ color: isDarkMode ? '#fff' : '#052a4d' }}>
                      {words[0]}
                    </span>{' '}
                    {words.slice(1).join(' ')}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-4 md:mt-6">
          <button
            onClick={() => navigate(`/offering/${feature.id}`)}
            className="px-6 py-3 md:px-10 md:py-4 bg-[#0066ff] hover:bg-[#0055ee] text-white rounded-xl font-black text-sm md:text-lg transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center gap-2 group pointer-events-auto"
          >
            Deep Dive
            <svg
              className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* RIGHT MEDIA */}
      <div className="flex-[0.8] md:flex-1 relative overflow-hidden bg-black/5 border-t md:border-t-0 md:border-l border-[#0066ff]/10">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export function FeatureCard({ offerings: dynamicOfferings }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const features = (dynamicOfferings?.length ? dynamicOfferings : defaultOfferings).map(
    (item, index) => {
      const localMatch =
        defaultOfferings.find(
          (d) => d.id === item.id || toSlug(d.title) === toSlug(item.title)
        ) || defaultOfferings[index];
      const cmsBullets = getBulletPoints(item);
      const finalBullets =
        cmsBullets.length >= 3
          ? cmsBullets
          : localMatch?.points || localMatch?.bullets || [];

      return {
        id: item.id || `service-${index + 1}`,
        title: item.title || localMatch?.title || 'UNTITLED SERVICE',
        description: item.description || localMatch?.description || '',
        image: toMediaUrl(item.image) || resolveFeatureFallbackImage(item, index),
        bullets: finalBullets,
        subtitle: item.subtitle || localMatch?.subtitle || 'Expert solutions for your growth'
      };
    }
  );

  return (
    <div className="w-full relative py-20 overflow-visible">
      <ScrollStack
        itemDistance={0}
        itemStackDistance={0}
        useWindowScroll={true}
        className="overflow-visible"
      >
        {features.map((feature, index) => (
          <ScrollStackItem 
            key={feature.id}
            itemClassName="border border-blue-500/10"
            style={{
              boxShadow: isDarkMode 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                : '0 25px 50px -12px rgba(0, 85, 170, 0.12)'
            }}
          >
            <CardLayout feature={feature} index={index} isDarkMode={isDarkMode} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
