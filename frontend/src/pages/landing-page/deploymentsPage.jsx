import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { deploymentsGalleryData, getDeploymentsByType } from './sections/deploymentGallery/deploymentsGalleryData';

export default function DeploymentsPage() {
  const navigate = useNavigate();
  const deploymentsByType = getDeploymentsByType();
  const types = Object.keys(deploymentsByType);

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
            DEPLOYMENT
            <span style={{ color: '#1e7fd4' }}> GALLERY</span>
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
            Explore our complete portfolio of successful deployments,
            from network solutions to enterprise-scale implementations.
          </p>
        </motion.div>

        {/* Deployments by Type */}
        {types.map((type, typeIndex) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: typeIndex * 0.1 }}
            style={{ marginBottom: '80px' }}
          >
            {/* Type Section Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '32px',
                paddingBottom: '16px',
                borderBottom: '2px solid #1e7fd4',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#4da6ff',
                }}
              />
              <h2
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 'clamp(18px, 3vw, 24px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {type}
              </h2>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '14px',
                  color: '#1e7fd4',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                }}
              >
                {deploymentsByType[type].length} Items
              </span>
            </div>

            {/* Type Items Gallery */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {deploymentsByType[type].map((deployment, index) => (
                <motion.div
                  key={deployment.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#0a0a0a',
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: '300px',
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
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    
                    {/* Overlay with info on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '24px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Inter', Arial, sans-serif",
                          fontSize: '11px',
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
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {deployment.project}
                      </h3>
                    </motion.div>

                    {/* Type Badge */}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
