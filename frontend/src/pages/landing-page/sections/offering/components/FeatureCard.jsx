import ScrollStack, { ScrollStackItem } from './ScrollStack';

export function FeatureCard() {
  const features = [
    {
      title: "TAILORED APPLICATIONS",
      description: "Custom-built solutions designed specifically for your business needs",
      icon: "tailored"
    },
    {
      title: "SEAMLESS USER EXPERIENCES",
      description: "Intuitive interfaces that users love and adoption rates that soar",
      icon: "seamless"
    },
    {
      title: "EMPOWERED WITH DIGITAL GROWTH",
      description: "Scalable architecture built for your business expansion",
      icon: "empowered"
    },
  ];

  const renderFeatureIcon = (index) => (
    <svg
      className="w-8 h-8 text-blue-500"
      fill="url(#triangleGradient)"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id={`triangleGradient${index}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <polygon points="12,2 22,20 2,20" />
    </svg>
  );

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ScrollStack Features */}
        <ScrollStack
          className="min-h-screen"
          itemDistance={50}
          itemScale={0.04}
          itemStackDistance={5}
          stackPosition="35%"
          scaleEndPosition="15%"
          baseScale={0.88}
          blurAmount={0}
          useWindowScroll={true}
        >
          {features.map((feature, idx) => (
            <ScrollStackItem key={idx} itemClassName="bg-white hover:shadow-2xl transition-shadow duration-300">
              <div className="flex gap-6">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {renderFeatureIcon(idx)}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 tracking-wide mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Visual Placeholder */}
                  <div className="mt-4 hidden sm:block">
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded opacity-60"></div>
                      <div className="h-8 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded opacity-40"></div>
                      <div className="h-8 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded opacity-40"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
