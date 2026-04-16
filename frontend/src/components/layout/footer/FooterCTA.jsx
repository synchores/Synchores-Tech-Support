export function FooterCTA({ onNavigate }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          fontWeight: 700,
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: '0 0 clamp(12px, 2%, 16px) 0',
          wordBreak: 'break-word',
        }}
      >
        GET IN TOUCH
      </p>
      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: 'clamp(14px, 3vw, 16px)',
          color: '#ffffff',
          lineHeight: 1.5,
          margin: '0 0 clamp(12px, 2%, 18px) 0',
          wordBreak: 'break-word',
        }}
      >
        Ready to leverage technology for your business?
      </p>
      <button
        onClick={() => onNavigate('contact')}
        style={{
          background: 'transparent',
          border: '2px solid #1e7fd4',
          borderRadius: '2px',
          padding: 'clamp(10px, 2%, 12px) clamp(18px, 4%, 24px)',
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: 'clamp(13px, 2.5vw, 15px)',
          fontWeight: 700,
          color: '#ffffff',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1eaedb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        CONTACT US
      </button>
    </div>
  );
}
