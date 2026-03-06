import { User } from "lucide-react";

const statusConfig = {
  // Backend statuses
  pending: { bg: "#eff6ff", color: "#3b82f6", label: "Pending" },
  in_progress: { bg: "#fffbeb", color: "#f59e0b", label: "In Progress" },
  on_hold: { bg: "#fef3c7", color: "#f59e0b", label: "On Hold" },
  completed: { bg: "#f0fdf4", color: "#22c55e", label: "Completed" },
  cancelled: { bg: "#f8fafc", color: "#94a3b8", label: "Cancelled" },
  // Legacy frontend statuses (for compatibility)
  open: { bg: "#eff6ff", color: "#3b82f6", label: "Open" },
  "in-progress": { bg: "#fffbeb", color: "#f59e0b", label: "In Progress" },
  resolved: { bg: "#f0fdf4", color: "#22c55e", label: "Resolved" },
  closed: { bg: "#f8fafc", color: "#94a3b8", label: "Closed" },
};

const priorityConfig = {
  critical: { color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
  high: { color: "#f97316", bg: "#fff7ed", dot: "#f97316" },
  medium: { color: "#f59e0b", bg: "#fffbeb", dot: "#f59e0b" },
  low: { color: "#22c55e", bg: "#f0fdf4", dot: "#22c55e" },
};

const categoryColors = {
  network: "#3b82f6",
  hardware: "#f59e0b",
  software: "#8b5cf6",
  security: "#ef4444",
  billing: "#06b6d4",
  cloud: "#6366f1",
  general: "#8b5cf6",
};

export function TicketsTable({ 
  filtered, 
  selected, 
  onSelectAll, 
  onSelectRow, 
  ticketList, 
  onStatusChange, 
  onAssignClick 
}) {
  return (
    <div className="overflow-x-auto">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#fafafa" }}>
            <th style={{ width: "40px", padding: "10px 16px" }}>
              <input 
                type="checkbox" 
                style={{ cursor: "pointer" }} 
                onChange={e => onSelectAll(e.target.checked)} 
              />
            </th>
            {["Ticket ID","Title","Customer","Category","Priority","Status","Assigned To","Created","Actions"].map(h => (
              <th key={h} style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textAlign: "left", padding: "10px 16px", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "40px", fontSize: "14px", color: "#94a3b8" }}>
                No tickets found matching your filters.
              </td>
            </tr>
          ) : filtered.map((t) => {
            const s = statusConfig[t.status];
            const p = priorityConfig[t.priority];
            return (
              <tr key={t.id} style={{ borderTop: "1px solid #f8fafc" }} className="hover:bg-slate-50 transition-colors">
                <td style={{ padding: "12px 16px" }}>
                  <input 
                    type="checkbox" 
                    checked={selected.includes(t.id)} 
                    onChange={e => onSelectRow(t.id, e.target.checked)} 
                    style={{ cursor: "pointer" }} 
                  />
                </td>
                <td style={{ padding: "12px 16px", fontSize: "12px", fontWeight: 700, color: "#3b82f6", whiteSpace: "nowrap" }}>
                  {t.id}
                </td>
                <td style={{ padding: "12px 16px", maxWidth: "220px" }}>
                  <p style={{ fontSize: "13px", color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.title}
                  </p>
                  <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {(t.description || "").slice(0, 50)}...
                  </p>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b" }}>{t.customer}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8" }}>{t.customerEmail}</p>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span className="px-2 py-1 rounded-lg" style={{ fontSize: "11px", fontWeight: 600, background: `${categoryColors[t.category]}18`, color: categoryColors[t.category], textTransform: "capitalize" }}>
                    {t.category}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full" style={{ width: 7, height: 7, background: p?.dot || "#94a3b8", flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: p?.color || "#94a3b8", textTransform: "capitalize" }}>
                      {t.priority}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <select
                    value={t.status}
                    onChange={e => onStatusChange(t.id, e.target.value)}
                    style={{ padding: "4px 8px", border: `1px solid ${s?.color || "#94a3b8"}40`, borderRadius: "20px", fontSize: "11px", fontWeight: 600, color: s?.color || "#94a3b8", background: s?.bg || "#f8fafc", outline: "none", cursor: "pointer" }}
                  >
                    {["pending", "in_progress", "on_hold", "completed", "cancelled"].map(st => (
                      <option key={st} value={st}>{statusConfig[st]?.label || st}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {t.assignedAgent ? (
                    <div className="flex items-center gap-2">
                      <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 24, height: 24, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", fontSize: "9px", fontWeight: 700, color: "white" }}>
                        {t.assignedAgent.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span style={{ fontSize: "12px", color: "#1e293b", whiteSpace: "nowrap" }}>
                        {t.assignedAgent.split(" ")[0]}
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#ef4444", fontStyle: "italic" }}>Unassigned</span>
                  )}
                </td>
                <td style={{ padding: "12px 16px", fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap" }}>
                  {new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    onClick={() => onAssignClick(t)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-50"
                    style={{ border: "1px solid #bfdbfe", fontSize: "11px", fontWeight: 600, color: "#3b82f6", whiteSpace: "nowrap" }}
                  >
                    <User size={11} /> {t.assignedAgent ? "Reassign" : "Assign"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
