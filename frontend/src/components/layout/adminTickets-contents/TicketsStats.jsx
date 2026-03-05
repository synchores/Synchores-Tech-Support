import { Ticket as TicketIcon } from "lucide-react";

export function TicketsStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Open", value: stats.open, color: "#3b82f6", bg: "#eff6ff" },
        { label: "In Progress", value: stats.inProgress, color: "#f59e0b", bg: "#fffbeb" },
        { label: "Resolved", value: stats.resolved, color: "#22c55e", bg: "#f0fdf4" },
        { label: "Critical", value: stats.critical, color: "#ef4444", bg: "#fef2f2" },
      ].map(s => (
        <div key={s.label} className="rounded-xl p-4 flex items-center gap-4" style={{ background: "white", border: "1px solid #e2e8f0" }}>
          <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: s.bg }}>
            <TicketIcon size={18} color={s.color} />
          </div>
          <div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>{s.label} tickets</p>
          </div>
        </div>
      ))}
    </div>
  );
}
