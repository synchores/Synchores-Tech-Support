export function FooterBottom() {
  return (
    <div
      style={{
        borderTop: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        padding: 'clamp(12px, 2%, 20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(8px, 2%, 10px)',
        width: '100%',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          color: '#666666',
          margin: 0,
          wordBreak: 'break-word',
        }}
      >
        @ {new Date().getFullYear()}
      </span>
      <img
        src="/assets/synchores-color.png"
        alt="Synchores Logo"
        style={{ width: 'clamp(20px, 4vw, 24px)', height: 'clamp(20px, 4vw, 24px)', flexShrink: 0 }}
      />
      <span
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          color: '#666666',
          margin: 0,
          wordBreak: 'break-word',
        }}
      >
        Synchores I.T. Solutions. All rights reserved.
      </span>
    </div>
  );
}
