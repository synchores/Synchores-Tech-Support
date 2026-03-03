import { AlertTriangle, ArrowRight } from "lucide-react";

export function AlertBanner({ criticalTickets }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl"
      style={{
        background: "linear-gradient(90deg, #fef2f2, #fff7ed)",
        border: "1px solid #fecaca",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <AlertTriangle size={14} color="#ef4444" className="flex-shrink-0" />
      </div>
      <p
        style={{ fontSize: "11px", lineHeight: 1.4, color: "#7f1d1d" }}
        className="sm:text-sm"
      >
        <strong>{criticalTickets} critical</strong> tickets need attention
      </p>
      <button
        className="ml-auto sm:ml-auto flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm flex-shrink-0"
        style={{ background: "#ef4444", color: "white", fontWeight: 600 }}
      >
        View <ArrowRight size={12} />
      </button>
    </div>
  );
}
