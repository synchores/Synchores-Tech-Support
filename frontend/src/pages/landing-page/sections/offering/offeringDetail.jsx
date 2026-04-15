import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { offerings } from './data/offeringsData';

const THEME_PRIMARY = '#179cf9';
const THEME_PRIMARY_HOVER = '#1277d4';

export default function OfferingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offering = offerings.find((o) => o.id === id);

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

  const handleGoHome = (section) => {
    navigate('/', { state: { scrollTo: section } });
  };

  return (
    <div style={{ backgroundColor: '#060c14', minHeight: '100vh' }}>
      <section
        style={{
          position: 'relative',
          height: 'clamp(460px, 65vh, 700px)',
          overflow: 'hidden',
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
            padding: '0 40px 48px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#179cf9',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
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
                fontSize: '11px',
                fontWeight: 700,
                color: THEME_PRIMARY,
                letterSpacing: '0.12em',
                background: 'rgba(23,156,249,0.18)',
                border: '1px solid rgba(23,156,249,0.38)',
                borderRadius: '2px',
                padding: '4px 12px',
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

      <section style={{ backgroundColor: '#0c335e', padding: '72px 40px' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
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
                  fontSize: '11px',
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
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                color: '#ffffff',
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
                      fontSize: '14px',
                      color: '#ffffff',
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
                    background: '#0c335e',
                    padding: '32px 24px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
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
                      fontSize: '11px',
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
              onClick={() => handleGoHome('contact')}
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

      <section style={{ backgroundColor: '#060c14', padding: '72px 40px' }}>
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
                  fontSize: '11px',
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
                  padding: '32px 28px',
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
                    fontSize: '13px',
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
                    fontSize: '13.5px',
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

      <section style={{ backgroundColor: '#0c335e', padding: '72px 40px' }}>
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
                  fontSize: '11px',
                  fontWeight: 700,
                  color: THEME_PRIMARY,
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
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    color: 'rgba(23,156,249,0.16)',
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
                    color: THEME_PRIMARY,
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
                    color: '#ffffff',
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

      <section style={{ backgroundColor: '#060c14', padding: 0 }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '72px 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, rgba(23,156,249,0.2) 0%, rgba(5,12,24,0.85) 100%)',
              border: '1px solid rgba(23,156,249,0.38)',
              borderRadius: '2px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: THEME_PRIMARY,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  margin: '0 0 12px 0',
                }}
              >
                Ready to Get Started?
              </p>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  margin: '0 0 16px 0',
                  lineHeight: 1.3,
                }}
              >
                Book a Free Consultation
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Our consultants will assess your needs and recommend the right solution for your business - at no cost.
              </p>
            </div>
            <button
              onClick={() => handleGoHome('contact')}
              style={{
                background: THEME_PRIMARY,
                border: 'none',
                borderRadius: '2px',
                padding: '13px 24px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
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
              Contact Us
              <ArrowUpRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => navigate(`/offering/${nextOffering.id}`)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.07)',
              cursor: 'pointer',
              minHeight: '200px',
            }}
          >
            <img
              src={nextOffering.image}
              alt={nextOffering.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  color: THEME_PRIMARY,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  margin: '0 0 8px 0',
                }}
              >
                Next Service -
              </p>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: '0 0 6px 0',
                }}
              >
                {nextOffering.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#179cf9',
                  margin: 0,
                }}
              >
                {nextOffering.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
