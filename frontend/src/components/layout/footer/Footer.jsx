import { useNavigate, useLocation } from 'react-router-dom';
import { FooterLogo } from './FooterLogo';
import { FooterBrand } from './FooterBrand';
import { FooterNav } from './FooterNav';
import { FooterCTA } from './FooterCTA';
import { FooterBottom } from './FooterBottom';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNav = (sectionId) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <footer style={{ backgroundColor: '#0055aa', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(25px, 5%, 50px) clamp(15px, 3%, 20px) clamp(15px, 3%, 25px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 'clamp(12px, 2%, 20px)',
            marginBottom: 'clamp(20px, 3%, 30px)',
          }}
        >
          <FooterLogo />
          <FooterBrand />
          <FooterNav links={links} onNavigate={handleNav} />
          <FooterCTA onNavigate={handleNav} />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}
