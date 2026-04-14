import { ChevronLeft, ChevronRight } from "lucide-react";

export function NavigationArrow({ direction, onClick }) {
  const isLeft = direction === "left";
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`absolute ${isLeft ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-10 h-10 rounded flex items-center justify-center text-white transition-all z-10`}
      style={{
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1e7fd4";
        e.currentTarget.style.borderColor = "#1e7fd4";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0,0,0,0.6)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
      }}
    >
      <Icon size={18} />
    </button>
  );
}
