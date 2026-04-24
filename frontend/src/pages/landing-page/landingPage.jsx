import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Skeleton } from 'boneyard-js/react';
import '../../bones/registry';
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
  const [loadingStates, setLoadingStates] = useState({
    offering: true,
    about: true,
    deployment: true,
    contact: true,
    footer: true,
  });

  // Simulate loading delays for each section
  useEffect(() => {
    const timings = {
      offering: 1200,
      about: 1800,
      deployment: 2400,
      contact: 3000,
      footer: 3500,
    };

    const timeoutIds = [];

    Object.entries(timings).forEach(([key, delay]) => {
      const timeoutId = setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [key]: false }));
      }, delay);

      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

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
      <Skeleton name="offering-section" loading={loadingStates.offering} fixture={<OfferingSection />}>
        <OfferingSection />
      </Skeleton>
      <Skeleton name="about-section" loading={loadingStates.about} fixture={<AboutSection companyInfo={companyInfo} />}>
        <AboutSection companyInfo={companyInfo} />
      </Skeleton>
      <Skeleton name="about-alternate-section" loading={loadingStates.about} fixture={<AboutSectionAlternate companyInfo={companyInfo} />}>
        <AboutSectionAlternate companyInfo={companyInfo} />
      </Skeleton>
      <Skeleton name="deployment-section" loading={loadingStates.deployment} fixture={<DeploymentGallery />}>
        <DeploymentGallery />
      </Skeleton>
      <Skeleton name="contact-section" loading={loadingStates.contact} fixture={<ContactUs companyInfo={companyInfo} />}>
        <ContactUs companyInfo={companyInfo} />
      </Skeleton>
      <Skeleton name="footer-section" loading={loadingStates.footer} fixture={<Footer companyInfo={companyInfo} />}>
        <Footer companyInfo={companyInfo} />
      </Skeleton>
    </div>
  );
}