import TrueFocus from "../../../../components/layout/landing-contents/ui/trueFocus";

export default function Home() {
  return (
    <section id="home" className="relative w-full h-[550px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero_bg_loop_v1.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-#0000007d/40"></div>

      {/* Content - 2 Column Grid */}
      <div className="relative z-10 w-full flex items-start md:items-center justify-center px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full max-w-2xl md:max-w-6xl mx-auto items-start md:items-center">
          {/* Left Column - Logo */}
          <div className="flex justify-center items-center order-1 md:order-1">
            <img
              src="/assets/synchores-logo-vertical.png"
              alt="Synchores Logo"
              className="w-full max-w-[200px] sm:max-w-[215px] md:max-w-sm lg:max-w-lg xl:max-w-2xl object-contain"
            />
          </div>

          {/* Right Column - Text & CTA */}
          <div className="text-white text-center md:text-left order-2 md:order-2">
            <h1
              className="text-2xl sm:text-[27px] md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-3.5 md:mb-4 tracking-wide leading-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
            >
              Scalable Tech Solutions<br />
              Built for your<br />
              <span className="hidden md:inline">
                <TrueFocus 
                  sentence="BUSINESS SUCCESS"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="#0055aa"
                  animationDuration={0.5}
                  pauseBetweenAnimations={0.5}
                />
              </span>
              <span className="md:hidden">
                Business Success
              </span>
            </h1>
            <div className="flex flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 justify-center md:justify-start mt-4 sm:mt-5 md:mt-6 lg:mt-8">
              <button className="flex-1 bg-[#0055aa] hover:bg-[#003d7a] text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-3xl transition-colors text-xs sm:text-sm md:text-base">
                Services
              </button>
              <button className="flex-1 bg-transparent border-2 border-white hover:bg-white hover:text-[#0055aa] text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-3xl transition-colors text-xs sm:text-sm md:text-base">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Slice at Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-24 "
        style={{
          backgroundColor: "#ffffff",
          clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
        }}
      ></div>
    </section>
  );
}
