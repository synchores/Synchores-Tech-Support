import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useLandingServices } from '../../../../hooks/useLandingPageData';
import { offerings } from './data/offeringsData';
import HeroSection from './offering-detail/HeroSection';
import OverviewSection from './offering-detail/OverviewSection';
import FeaturesSection from './offering-detail/FeaturesSection';
import ProcessSection from './offering-detail/ProcessSection';
import CTASection from './offering-detail/CTASection';
import Footer from '../../../../components/layout/footer';
import { Moon, Sun } from 'lucide-react';

const THEME_PRIMARY = '#179cf9';
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;


function toSlug(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toMediaUrl(path = '') {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/uploads/')) return `${IMAGE_URL}${path}`;
  if (path.startsWith('uploads/')) return `${IMAGE_URL}/${path}`;
  return path;
}

function splitLines(value = '') {
  return String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseLabelValueLines(value = '', defaultLabelPrefix = 'Item') {
  return splitLines(value)
    .map((line, index) => {
      const [label, ...rest] = line.split('|');
      const normalizedLabel = (label || '').trim();
      const normalizedValue = rest.join('|').trim();

      if (!normalizedLabel && !normalizedValue) {
        return null;
      }

      return {
        label: normalizedLabel || `${defaultLabelPrefix} ${index + 1}`,
        value: normalizedValue || normalizedLabel,
      };
    })
    .filter(Boolean);
}

function parseFeatureLines(value = '') {
  return splitLines(value)
    .map((line) => {
      const [title, ...rest] = line.split('|');
      const normalizedTitle = (title || '').trim();
      const description = rest.join('|').trim();

      if (!normalizedTitle && !description) {
        return null;
      }

      return {
        title: normalizedTitle || 'Feature',
        description: description || normalizedTitle,
      };
    })
    .filter(Boolean);
}

function parseProcessLines(value = '') {
  return splitLines(value)
    .map((line, index) => {
      const [label, ...rest] = line.split('|');
      const normalizedLabel = (label || '').trim();
      const description = rest.join('|').trim();

      if (!normalizedLabel && !description) {
        return null;
      }

      return {
        step: index + 1 < 10 ? `0${index + 1}` : String(index + 1),
        label: normalizedLabel || 'Step',
        description: description || normalizedLabel,
      };
    })
    .filter(Boolean);
}

export default function OfferingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, loading } = useLandingServices({ status: 'published' });
  const [isDark, setIsDark] = useState(false);

  const serviceDrivenOfferings = useMemo(() => {
    if (!services?.length) {
      return offerings;
    }

    return services.map((service) => {
      const slug = toSlug(service.title);
      const fallback = offerings.find(
        (item) => toSlug(item.id) === slug || toSlug(item.title) === slug,
      );

      return {
        ...(fallback || {}),
        id: fallback?.id || slug,
        title: service.title || fallback?.title || 'Untitled Service',
        displayTitle: fallback?.displayTitle || service.title || 'Untitled Service',
        subtitle: service.subtitle || fallback?.subtitle || service.category || 'Business Solutions',
        heroSubtitle: fallback?.heroSubtitle || service.description || '',
        description: service.description || fallback?.description || '',
        longDescription: service.longDescription || fallback?.longDescription || service.description || 'Service details will be available soon.',
        bullets: fallback?.bullets || [service.category || 'General Service'],
        points: splitLines(service.points).length
          ? splitLines(service.points)
          : fallback?.points || [service.description || 'Details coming soon.'],
        stats: parseLabelValueLines(service.stats, 'Metric').length
          ? parseLabelValueLines(service.stats, 'Metric')
          : fallback?.stats || [
              { label: 'Quality', value: '95%' },
              { label: 'Delivery', value: 'On Time' },
              { label: 'Coverage', value: 'End-to-End' },
              { label: 'Support', value: '24/7' },
            ],
        features: parseFeatureLines(service.features).length
          ? parseFeatureLines(service.features)
          : fallback?.features || [
              {
                title: 'Core Capability',
                description: service.description || 'Feature details will be available soon.',
              },
            ],
        process: parseProcessLines(service.process).length
          ? parseProcessLines(service.process)
          : fallback?.process || [
              { step: '01', label: 'Assess', description: 'Understand goals and current state.' },
              { step: '02', label: 'Plan', description: 'Define scope and implementation path.' },
              { step: '03', label: 'Deliver', description: 'Execute milestones with quality checks.' },
              { step: '04', label: 'Optimize', description: 'Improve outcomes continuously.' },
            ],
        ctaTitle: service.ctaTitle || fallback?.ctaTitle || 'Ready to Get Started?',
        ctaDescription:
          service.ctaDescription ||
          fallback?.ctaDescription ||
          `Connect with our team to explore how ${service.title || fallback?.title || 'this service'} can transform your operations and drive growth.`,
        ctaButtonLabel: service.ctaButtonLabel || fallback?.ctaButtonLabel || 'Schedule Consultation',
        shortDescription: service.description || fallback?.description || '',
        image: toMediaUrl(service.image) || fallback?.image || '/assets/placeholder-service.jpg',
      };
    });
  }, [services]);

  const offering = useMemo(() => {
    const routeSlug = toSlug(id);
    return serviceDrivenOfferings.find(
      (item) =>
        item.id === id ||
        toSlug(item.id) === routeSlug ||
        toSlug(item.title) === routeSlug,
    );
  }, [id, serviceDrivenOfferings]);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Theme detection
  useEffect(() => {
    const currentIsDark = document.documentElement.classList.contains('dark');
    setIsDark(currentIsDark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    localStorage.setItem('theme', nextTheme);
    setIsDark(nextTheme === 'dark');
  };

  if (loading && !offering) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#060c14',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: "'Inter', Arial, sans-serif",
        }}
      >
        Loading service details...
      </div>
    );
  }

  if (!loading && !offering) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: "'Inter', Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: THEME_PRIMARY, marginBottom: '12px', letterSpacing: '0.1em' }}>404</p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", marginBottom: '24px' }}>
            Service Not Found
          </h1>
          <button
            onClick={() => navigate('/')}
            style={{
              background: THEME_PRIMARY,
              border: 'none',
              borderRadius: '2px',
              padding: '12px 24px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentIndex = serviceDrivenOfferings.findIndex((o) => o.id === offering?.id);
  const nextOffering =
    currentIndex >= 0
      ? serviceDrivenOfferings[(currentIndex + 1) % serviceDrivenOfferings.length]
      : null;

  const handleBack = () => {
    navigate('/', { state: { scrollTo: 'offering' } });
  };

  const handleConsultation = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  const handleNextService = () => {
    if (nextOffering?.id) {
      navigate(`/offering/${nextOffering.id}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#060c14', minHeight: '100vh', position: 'relative' }}>
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: isDark ? '#ffffff' : '#000000',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isDark ? (
          <Sun size={24} color="#000000" />
        ) : (
          <Moon size={24} color="#ffffff" />
        )}
      </button>
      <HeroSection offering={offering} currentIndex={currentIndex} onBack={handleBack} />
      <OverviewSection offering={offering} onCTA={handleConsultation} />
      <FeaturesSection offering={offering} />
      <ProcessSection offering={offering} />
      <CTASection 
        offering={offering} 
        currentIndex={currentIndex}
        nextOffering={nextOffering}
        onConsultation={handleConsultation}
        onNextService={handleNextService}
      />
      <Footer />
    </div>
  );
}
