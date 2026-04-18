import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const THEME_PRIMARY = '#179cf9';

export default function HeroSection({ offering, currentIndex, onBack }) {
  return (
    <section
      style={{
        position: 'relative',
        height: 'clamp(460px, 65vh, 700px)',
        overflow: 'hidden',
        backgroundColor: 'var(--landing-bg)',
      }}
    >
      <img
        src={offering.image}
        alt={offering.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 55%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '24px',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(7rem, 15vw, 14rem)',
          fontWeight: 900,
          color: 'rgba(23,156,249,0.18)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {currentIndex < 9 ? `0${currentIndex + 1}` : currentIndex + 1}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 clamp(16px, 5vw, 40px) clamp(32px, 8vh, 48px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#179cf9',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(10px, 2vw, 12px)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '24px',
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = THEME_PRIMARY;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#179cf9';
          }}
        >
          <ArrowLeft size={14} />
          Back to Offerings
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(9px, 1.8vw, 11px)',
              fontWeight: 700,
              color: THEME_PRIMARY,
              letterSpacing: '0.12em',
              background: 'rgba(23,156,249,0.18)',
              border: '1px solid rgba(23,156,249,0.38)',
              borderRadius: '2px',
              padding: 'clamp(3px, 0.5vw, 4px) clamp(8px, 2vw, 12px)',
              display: 'inline-block',
              marginBottom: '14px',
            }}
          >
            SERVICE {currentIndex < 9 ? `0${currentIndex + 1}` : currentIndex + 1}
          </span>

          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 10px 0',
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              maxWidth: '700px',
            }}
          >
            {offering.title}
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: THEME_PRIMARY,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}
          >
            {offering.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
