import { motion } from 'motion/react';

const THEME_PRIMARY = '#179cf9';

export default function ProcessSection({ offering }) {
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
              Streamlined Approach
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
            How It Works
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '32px',
          }}
        >
          {offering.process.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ position: 'relative' }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    minWidth: 'fit-content',
                    width: '56px',
                    height: '56px',
                    background: `linear-gradient(135deg, ${THEME_PRIMARY}33 0%, transparent 100%)`,
                    border: `1px solid ${THEME_PRIMARY}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'clamp(12px, 2vw, 16px)',
                      fontWeight: 700,
                      color: THEME_PRIMARY,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div style={{ paddingTop: '6px', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'clamp(11px, 2vw, 13px)',
                      fontWeight: 700,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {step.title}
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
                    {step.description}
                  </p>
                </div>
              </div>

              {i < offering.process.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '27px',
                    top: '60px',
                    width: '2px',
                    height: '32px',
                    background: `linear-gradient(180deg, ${THEME_PRIMARY} 0%, transparent 100%)`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
