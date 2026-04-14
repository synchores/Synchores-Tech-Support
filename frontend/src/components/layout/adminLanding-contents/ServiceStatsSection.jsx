import { Package, Clock } from "lucide-react";

export function ServiceStatsSection({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        className="rounded-xl p-4 flex items-center gap-4"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            background: "#eff6ff",
          }}
        >
          <Package size={18} color="#3b82f6" />
        </div>
        <div>
          <p
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1,
            }}
          >
            {stats.total}
          </p>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>
            Total Services
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-4 flex items-center gap-4"
        style={{ background: "white", border: "1px solid #e2e8f0" }}
      >
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            background: "#fef3c7",
          }}
        >
          <Clock size={18} color="#f59e0b" />
        </div>
        <div>
          <p
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1,
            }}
          >
            {stats.total > 0 ? "Active" : "None"}
          </p>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>Status</p>
        </div>
      </div>
    </div>
  );
}
