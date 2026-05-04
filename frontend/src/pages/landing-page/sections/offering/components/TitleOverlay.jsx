import { ArrowUpRight } from "lucide-react";

export function TitleOverlay({ displayTitle, subtitle }) {
  return (
    <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 z-20">
      <div className="max-w-5xl">
        <h3 className="flex items-center gap-2 sm:gap-3 font-bold text-white mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
          {displayTitle}
          <ArrowUpRight size={24} style={{ color: "#1e7fd4" }} className="flex-shrink-0" />
        </h3>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
