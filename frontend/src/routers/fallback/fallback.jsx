import { useState, useEffect } from "react";
import { Navbar} from "../../components/layout/landing-contents/ui/headNav.jsx";
import {Footer} from "../../components/layout/footer/Footer.jsx";

export default function Fallback() {
  const [activeSection, setActiveSection] = useState("home");
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  useEffect(() => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    setThemeMode(currentIsDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setThemeMode(dark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const bgColor = themeMode === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50";
  const textPrimary = themeMode === "dark" ? "text-gray-300" : "text-gray-800";
  const textSecondary = themeMode === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`w-full min-h-screen ${bgColor}`}>
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} isFallbackPage={true} />
      
      <div className="w-full pt-20 flex items-center justify-center flex-grow mb-[25%] pt-[15%]">
        <div className="text-center px-8">
          <img
            src="/assets/synchores-color.png"
            alt="Synchores Logo"
            className="w-32 h-32 mx-auto mb-8 opacity-90"
          />
          <h1 className="text-[#00a8ff] text-8xl font-bold mb-4">404</h1>
          <h2 className={`${textPrimary} text-3xl mb-6`}>Page Not Found</h2>
          <p className={`${textSecondary} text-lg max-w-md mx-auto mb-8`}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#00a8ff] text-white rounded-lg hover:bg-[#0090db] transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}