import { motion } from 'motion/react';

const THEME_PRIMARY = '#179cf9';

export default function FeaturesSection({ offering }) {
  return (
    <section style={{ backgroundColor: '#0c335e', padding: 'clamp(48px, 10vh, 72px) clamp(16px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
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
              Core Capabilities
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            What's Included
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {offering.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: '#060c14',
                padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  background: `linear-gradient(90deg, ${THEME_PRIMARY} 0%, transparent 60%)`,
                  marginBottom: '20px',
                }}
              />
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 'clamp(11px, 2vw, 13px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: '0 0 12px 0',
                  lineHeight: 1.3,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(12px, 2vw, 13.5px)',
                  color: '#ffffff',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
