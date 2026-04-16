export function FooterLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <img
        src="/assets/Synchores-logo.png"
        alt="Synchores Logo"
        style={{ width: 'clamp(100px, 20vw, 130px)', height: 'clamp(100px, 20vw, 130px)' }}
      />
    </div>
  );
}
