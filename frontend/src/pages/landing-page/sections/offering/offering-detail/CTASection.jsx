import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const THEME_PRIMARY = '#179cf9';
const THEME_HOVER = '#1277d4';

export default function CTASection({ offering, currentIndex, nextOffering, onConsultation, onNextService }) {
  return (
    <section style={{ backgroundColor: '#060c14', padding: 'clamp(48px, 10vh, 72px) clamp(16px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: `linear-gradient(135deg, ${THEME_PRIMARY}22 0%, ${THEME_PRIMARY}08 100%)`,
              border: `1px solid ${THEME_PRIMARY}40`,
              borderRadius: '2px',
              padding: 'clamp(32px, 6vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: '0 0 16px 0',
                }}
              >
                Ready to Get Started?
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(13px, 1.8vw, 15px)',
                  color: '#ffffff',
                  lineHeight: 1.7,
                  margin: '0 0 24px 0',
                }}
              >
                Connect with our team to explore how {offering.title} can transform your operations and drive growth.
              </p>
            </div>

            <motion.button
              onClick={onConsultation}
              whileHover={{ backgroundColor: THEME_HOVER }}
              transition={{ duration: 0.2 }}
              style={{
                background: THEME_PRIMARY,
                color: '#000000',
                border: 'none',
                borderRadius: '2px',
                padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 28px)',
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(11px, 1.8vw, 13px)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              Schedule Consultation
              <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>

          {nextOffering && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={onNextService}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '2px',
                padding: 'clamp(32px, 6vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: THEME_PRIMARY,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(8px, 1.5vw, 10px)',
                      fontWeight: 700,
                      color: THEME_PRIMARY,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Next Service
                  </span>
                  <ArrowRight size={12} color={THEME_PRIMARY} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    margin: '0 0 8px 0',
                  }}
                >
                  {nextOffering.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(12px, 1.8vw, 13.5px)',
                    color: '#ffffff',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {nextOffering.shortDescription || nextOffering.longDescription.substring(0, 120) + '...'}
                </p>
              </div>

              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: `1px solid ${THEME_PRIMARY}40`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(10px, 1.6vw, 12px)',
                    color: THEME_PRIMARY,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Learn More
                </span>
                <ArrowRight size={14} color={THEME_PRIMARY} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
