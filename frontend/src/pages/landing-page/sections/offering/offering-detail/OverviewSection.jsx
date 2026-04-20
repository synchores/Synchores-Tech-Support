import { motion } from 'motion/react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

const THEME_PRIMARY = '#179cf9';
const THEME_PRIMARY_HOVER = '#1277d4';

export default function OverviewSection({ offering, onCTA }) {
  return (
    <section style={{ backgroundColor: 'var(--landing-bg-strong)', padding: 'clamp(48px, 10vh, 72px) clamp(16px, 5vw, 40px)' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(32px, 8vw, 64px)',
          alignItems: 'start',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '28px', height: '2px', background: THEME_PRIMARY }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(9px, 1.8vw, 11px)',
                fontWeight: 700,
                color: THEME_PRIMARY,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              Overview
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(18px, 1.8vw, 20.4px)',
              color: 'var(--landing-text)',
              lineHeight: 1.75,
              margin: '0 0 32px 0',
            }}
          >
            {offering.longDescription}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {offering.points.map((pt) => (
              <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={15} color={THEME_PRIMARY} style={{ flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(12px, 2vw, 14px)',
                    color: 'var(--landing-text)',
                  }}
                >
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'rgba(23,156,249,0.18)',
              border: '1px solid rgba(23,156,249,0.26)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {offering.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--landing-surface)',
                  padding: '32px 24px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)',
                    fontWeight: 700,
                    color: THEME_PRIMARY,
                    marginBottom: '6px',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(8px, 1.5vw, 11px)',
                    fontWeight: 700,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    margin: 0,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onCTA}
            style={{
              marginTop: '24px',
              width: '100%',
              background: THEME_PRIMARY,
              border: 'none',
              borderRadius: '2px',
              padding: '14px 24px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = THEME_PRIMARY_HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = THEME_PRIMARY;
            }}
          >
            Book a Consultation
            <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
