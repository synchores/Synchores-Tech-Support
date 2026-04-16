import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { deployments } from './sections/deploymentGallery/deploymentsData';

export default function DeploymentsPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#1e7fd4',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Rajdhani', sans-serif",
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#4da6ff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#1e7fd4')}
        >
          <ChevronLeft size={18} />
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}
        >
          <h1
            style={{
              fontFamily: "'Orbitron', Arial, sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
            }}
          >
            Our Deployments
            <span style={{ color: '#1e7fd4' }}> in the Field</span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: '16px',
              color: '#757575',
              marginTop: '16px',
              lineHeight: 1.7,
              maxWidth: '600px',
            }}
          >
            Explore our complete portfolio of successful IT infrastructure deployments,
            from network solutions to enterprise-scale implementations.
          </p>
        </motion.div>

        {/* Deployments Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {deployments.map((deployment, index) => (
            <motion.div
              key={deployment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                border: '1px solid #1a1a1a',
                borderRadius: '4px',
                overflow: 'hidden',
                background: '#0a0a0a',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1e7fd4';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(30,127,212,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a1a';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '240px',
                  backgroundColor: '#111',
                }}
              >
                <img
                  src={deployment.image}
                  alt={deployment.project}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(30,127,212,0.5)',
                    borderRadius: '2px',
                    padding: '4px 12px',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#1e7fd4',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {deployment.type}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Orbitron', Arial, sans-serif",
                      fontSize: '28px',
                      fontWeight: 900,
                      color: 'rgba(30,127,212,0.1)',
                      lineHeight: 1,
                    }}
                  >
                    {String(deployment.id).padStart(2, '0')}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#1e7fd4',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    margin: '0 0 8px 0',
                  }}
                >
                  {deployment.label}
                </p>

                <h3
                  style={{
                    fontFamily: "'Orbitron', Arial, sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    margin: '0 0 12px 0',
                    lineHeight: 1.3,
                  }}
                >
                  {deployment.project}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '13px',
                    color: '#757575',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {deployment.detail || 'Learn more about this deployment'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
