import Home from "./sections/homeSection";
import  OfferingSection  from "./sections/offeringSection";

export default function LandingPage() {
  return (
    <div className="w-full h-full">
      <Home />
      <OfferingSection />
    </div>
  );
}