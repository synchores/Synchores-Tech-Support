import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./socialIcons";
import { THEME } from "../../../../constant/theme.js"; // Adjust path to your constants

export function Navbar({ activeSection, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const [themeMode, setThemeMode] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
  const [isDark, setIsDark] = useState(false);

  // Detect if on tech support page
  const isOnTechSupportPage = location.pathname === "/tech-support";

  useEffect(() => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    setThemeMode(currentIsDark ? "dark" : "light");
    setIsDark(currentIsDark);

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
      setThemeMode(dark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      // Only update if not manually scrolling
      if (!isManualScrolling) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onNavigate(entry.target.id);
          }
        });
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const navLinks = ["home", "offering", "about", "contact"];
    navLinks.forEach((linkId) => {
      const element = document.getElementById(linkId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [onNavigate, isManualScrolling]);

  const navLinks = [
    { id: "home", label: "HOME" },
    { id: "offering", label: "OFFERINGS" },
    { id: "about", label: "ABOUT US" },
    { id: "contact", label: "CONTACT US" },
    { id: "Tech Support", label: "TECH SUPPORT" },
  ];

  const handleNav = (id) => {
    setMobileOpen(false);
    
    // Navigate to Tech Support page if clicked
    if (id === "Tech Support") {
      navigate("/tech-support");
      return;
    }
    
    // If on tech support page and clicking a landing page link, navigate to landing page first
    if (isOnTechSupportPage) {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    
    // Already on landing page, just scroll to section
    setIsManualScrolling(true);
    navigate("/", { state: { scrollTo: id } });
    
    // Re-enable observer after scroll completes
    setTimeout(() => setIsManualScrolling(false), 1000);
  };

  const toggleTheme = () => {
    const nextTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("synchores-theme", nextTheme);
  };

  // Keep the top bar solid and high-contrast across routes.
  // On home section with no scroll, use 5% opacity; otherwise full color
  const isHomeSection = activeSection === "home";
  const navBgColor = isHomeSection && !scrolled 
    ? `rgba(30, 127, 212, 0.05)`
    : THEME.colors.primary;
  const navTextColor = "#ffffff";
  const mobileMenuTextColor = isDark ? "#ffffff" : "#111111";
  const navBorderColor = "rgba(255,255,255,0.2)";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/40" : ""
      }`}
      style={{ 
        backgroundColor: navBgColor,
        borderBottom: `1px solid ${navBorderColor}`,
        transition: "background-color 0.3s ease"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Social Icons */}
          <div className="flex items-center gap-4">
            {/* Logo Mark */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2 group"
            >
              <SNavLogo />
            </button>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-3 ml-2">
              <a
                href="https://www.facebook.com/synchores.itsolutions"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: navTextColor }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/synchores.itsolutions/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: navTextColor }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/@SynchoresIT"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: navTextColor }}
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isOnTechSupportPage 
                ? link.id === "Tech Support"
                : activeSection === link.id;
              
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative text-sm tracking-widest transition-colors duration-200 py-1 px-3 rounded cursor-pointer ${
                    link.id === "Tech Support"
                      ? isOnTechSupportPage
                        ? "font-semibold"
                        : "bg-white text-[#1e7fd4] font-semibold hover:bg-gray-100"
                      : ""
                  }`}
                  style={{ 
                    fontFamily: "'Rajdhani', sans-serif", 
                    letterSpacing: "0.1em",
                    color: link.id === "Tech Support" && !isOnTechSupportPage
                      ? "#1e7fd4"
                      : navTextColor,
                    opacity: isOnTechSupportPage ? 1 : (isActive ? 1 : 0.7),
                  }}
                >
                  {link.label}
                  {isActive && link.id !== "Tech Support" && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: THEME.colors.accent }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center"
            aria-label="Toggle theme"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              border: `1px solid ${navBorderColor}`,
              backgroundColor: isOnTechSupportPage
                ? (isDark ? "rgba(30,127,212,0.2)" : "rgba(0,85,170,0.1)")
                : (themeMode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.22)"),
              color: navTextColor,
              cursor: "pointer",
            }}
          >
            {themeMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: "#ffffff" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-4 pb-4 pt-2 flex flex-col gap-3"
          style={{ 
            backgroundColor: isOnTechSupportPage
              ? (isDark ? THEME.colors.darkBgAlt : THEME.colors.gray[100])
              : (isDark ? "var(--landing-bg-strong)" : "#f5f5f5"),
            borderTop: `1px solid ${navBorderColor}`
          }}
        >
          {navLinks.map((link) => {
            const isActive = isOnTechSupportPage 
              ? link.id === "Tech Support"
              : activeSection === link.id;
            
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-left py-2 px-3 text-sm tracking-widest transition-colors rounded cursor-pointer`}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: link.id === "Tech Support" && !isOnTechSupportPage
                    ? "#1e7fd4"
                    : mobileMenuTextColor,
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 py-2 px-3 text-sm"
            style={{
              color: mobileMenuTextColor,
              border: `1px solid ${navBorderColor}`,
              borderRadius: "6px",
              background: isOnTechSupportPage
                ? (isDark ? "rgba(30,127,212,0.2)" : "rgba(0,85,170,0.1)")
                : (themeMode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.22)"),
            }}
          >
            {themeMode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          {/* Social icons on mobile */}
          <div className="flex items-center gap-4 pt-2">
            <a href="https://www.facebook.com/synchores.itsolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "#1e7fd4" }}>
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/synchores.itsolutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#1e7fd4" }}>
              <InstagramIcon />
            </a>
            <a href="https://www.youtube.com/@SynchoresIT" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "#1e7fd4" }}>
              <YouTubeIcon />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function SNavLogo() {
  return (
    <img
      src="/assets/Synchores-logo.png"
      alt="Synchores Logo"
      width="36"
      height="36"
      className="object-contain"
    />
  );
}

export default Navbar;