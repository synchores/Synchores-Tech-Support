import { motion } from 'motion/react';

export default function ProcessSection({ offering }) {
  return (
    <section style={{ backgroundColor: 'var(--landing-bg-strong)', padding: '72px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <div style={{ width: '28px', height: '2px', background: '#1e7fd4' }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#1e7fd4',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              Our Process
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              color: 'var(--landing-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            How It Works
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: '24px',
          }}
        >
          {offering.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{
                position: 'relative',
                padding: '28px 24px',
                border: `1px solid var(--landing-border)`,
                borderRadius: '2px',
                background: 'var(--landing-surface-soft)',
              }}
            >
              {/* Connector line (not on last) */}
              {i < offering.process.length - 1 && (
                <div
                  style={{
                    display: 'none',
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  color: 'rgba(30,127,212,0.12)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {step.step}
              </span>
              <h4
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#1e7fd4',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 10px 0',
                }}
              >
                {step.label}
              </h4>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13.5px',
                  color: '#6b7280',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
