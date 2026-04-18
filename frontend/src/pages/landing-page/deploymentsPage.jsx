import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { DeploymentGalleryGrid } from './sections/deploymentGallery/components/deploymentGalleryGrid';
import { Footer } from '../../components/layout/footer/Footer';

export default function DeploymentsPage() {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    setThemeMode(currentIsDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("synchores-theme", nextTheme);
  };

  return (
    <div style={{ backgroundColor: 'var(--landing-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--landing-text)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Rajdhani', sans-serif",
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1e7fd4')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--landing-text)')}
        >
          <ChevronLeft size={18} />
          Back to Home
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: themeMode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.22)",
            border: "none",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--landing-text)",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {themeMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <DeploymentGalleryGrid />
      <Footer />
    </div>
  );
}
