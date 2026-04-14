import Home from "./sections/homeSection";
import OfferingSection from "./sections/offering";

export default function LandingPage() {
  return (
    <div className="w-full h-full">
      <Home />
      <OfferingSection />
    </div>
  );
}