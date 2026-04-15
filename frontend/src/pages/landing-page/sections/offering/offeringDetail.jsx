import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { offerings } from './data/offeringsData';
import HeroSection from './offering-detail/HeroSection';
import OverviewSection from './offering-detail/OverviewSection';
import FeaturesSection from './offering-detail/FeaturesSection';
import ProcessSection from './offering-detail/ProcessSection';
import CTASection from './offering-detail/CTASection';

const THEME_PRIMARY = '#179cf9';

export default function OfferingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offering = offerings.find((o) => o.id === id);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!offering) {
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

  const currentIndex = offerings.findIndex((o) => o.id === id);
  const nextOffering = offerings[(currentIndex + 1) % offerings.length];

  const handleBack = () => {
    navigate('/', { state: { scrollTo: 'offering' } });
  };

  const handleConsultation = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  const handleNextService = () => {
    navigate(`/offering/${nextOffering.id}`);
  };

  return (
    <div style={{ backgroundColor: '#060c14', minHeight: '100vh' }}>
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
    </div>
  );
}
