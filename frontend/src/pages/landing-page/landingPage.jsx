import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from "./sections/home/homeSection";
import OfferingSection from "./sections/offering";
import AboutSection from "./sections/about/aboutSection";
import AboutSectionAlternate from "./sections/about/aboutSectionAlternate";
import DeploymentGallery from "./sections/deploymentGallery/deploymentGallery";
import ContactUs from "./sections/contactUs/contactUs";
import { Footer } from "../../components/layout/footer/Footer";
import { useCompanyInfo } from "../../hooks/useLandingPageData";

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { companyInfo } = useCompanyInfo();

  useEffect(() => {
    const targetSection = location.state?.scrollTo;
    if (!targetSection) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navigate(location.pathname, { replace: true, state: {} });
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state, navigate]);

  return (
    <div className="w-full h-full">
      <Home />
      <OfferingSection />
      <AboutSection companyInfo={companyInfo} />
      <AboutSectionAlternate companyInfo={companyInfo} />
      <DeploymentGallery />
      <ContactUs companyInfo={companyInfo} />
      <Footer companyInfo={companyInfo} />
    </div>
  );
}