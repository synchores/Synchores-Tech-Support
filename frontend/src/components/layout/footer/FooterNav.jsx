export function FooterNav({ links, onNavigate }) {
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
          margin: '0 0 clamp(12px, 2%, 18px) 0',
          wordBreak: 'break-word',
        }}
      >
        NAVIGATION
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 400,
              color: '#ffffff',
              padding: 0,
              transition: 'color 0.2s',
              wordBreak: 'break-word',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1e7fd4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
