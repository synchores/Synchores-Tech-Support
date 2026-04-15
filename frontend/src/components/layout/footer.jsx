import { useNavigate } from 'react-router-dom';

const THEME_PRIMARY = '#179cf9';

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#0055aa', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        {/* Footer Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Company Info */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: 0,
                }}
              >
                Synchores
              </h3>
              <div style={{ width: '28px', height: '2px', background: THEME_PRIMARY, marginTop: '12px' }} />
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13.5px',
                color: '#9ca3af',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Tech support and consultation services designed to elevate your business operations.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '0 0 20px 0',
              }}
            >
              Services
            </h4>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <button
                  onClick={() => navigate('/#services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Cloud Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Security & Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Infrastructure Setup
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '0 0 20px 0',
              }}
            >
              Company
            </h4>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#about')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#contact')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: '0 0 20px 0',
              }}
            >
              Support
            </h4>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <li>
                <button
                  onClick={() => navigate('/#support')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#support')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#tickets')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13.5px',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  Submit Ticket
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }} />

        {/* Footer Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '32px',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#6b7280',
              margin: 0,
            }}
          >
            &copy; {currentYear} Synchores. All rights reserved.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '24px',
            }}
          >
            <button
              onClick={() => navigate('/#privacy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
              onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/#terms')}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = THEME_PRIMARY)}
              onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
