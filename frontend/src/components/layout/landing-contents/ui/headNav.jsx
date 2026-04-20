import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./socialIcons";
import { THEME } from "../../../../constant/theme.js"; // Adjust path to your constants

export function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

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
    const navLinks = ["home", "offering", "about", "contact", "Tech Support"];
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
    setIsManualScrolling(true);
    onNavigate(id);
    setMobileOpen(false);
    
    // Scroll to the section with offset for fixed navbar
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // h-16 = 64px
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      
      // Re-enable observer after scroll completes
      setTimeout(() => setIsManualScrolling(false), 1000);
    }
  };

  const toggleTheme = () => {
    const nextTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("synchores-theme", nextTheme);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/40" : ""
      }`}
      style={{ 
        backgroundColor: THEME.colors.primary,
        borderBottom: "1px solid rgba(30,127,212,0.25)"
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
                href="#"
                aria-label="Facebook"
                className="transition-colors"
                style={{ color: "#ffffff" }}
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative text-sm tracking-widest transition-colors duration-200 py-1 px-3 rounded cursor-pointer ${
                  link.id === "Tech Support"
                    ? "bg-white text-[#1e7fd4] font-semibold hover:bg-gray-100"
                    : activeSection === link.id
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em" }}
              >
                {link.label}
                {activeSection === link.id && link.id !== "Tech Support" && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: THEME.colors.accent }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center"
            aria-label="Toggle theme"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              border: "1px solid rgba(30,127,212,0.35)",
              backgroundColor:
                themeMode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.22)",
              color: "#ffffff",
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
          style={{ backgroundColor: "var(--landing-bg-strong)", borderTop: THEME.borders.mobile }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-left py-2 px-3 text-sm tracking-widest transition-colors rounded cursor-pointer ${
                link.id === "Tech Support"
                  ? "text-white font-bold"
                  : activeSection === link.id
                  ? "text-blue-400"
                  : "text-gray-300"
              }`}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color:
                  link.id === "Tech Support"
                    ? "var(--landing-text)"
                    : activeSection === link.id
                    ? "#1e7fd4"
                    : "var(--landing-text-soft)",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 py-2 px-3 text-sm"
            style={{
              color: "#ffffff",
              border: "1px solid rgba(30,127,212,0.35)",
              borderRadius: "6px",
              background:
                themeMode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.22)",
            }}
          >
            {themeMode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          {/* Social icons on mobile */}
          <div className="flex items-center gap-4 pt-2">
            <a href="#" aria-label="Facebook" className="text-blue-400">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="text-blue-400">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube" className="text-blue-400">
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