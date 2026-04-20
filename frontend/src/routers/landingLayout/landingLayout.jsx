import { useLayoutEffect, useState } from "react";
import "../../styles/landingLayout.css";
import { Navbar } from "../../components/layout/landing-contents/ui/headNav";

export default function LandingLayout({ children }) {
  const [activeSection, setActiveSection] = useState("home");

  useLayoutEffect(() => {
    // Keep landing in its original readable light theme.
    document.documentElement.classList.remove("dark");
  }, []);

  const handleNavigate = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-layout-shell min-h-full flex flex-col">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="pt-0">{children}</main>
    </div>
  );
}