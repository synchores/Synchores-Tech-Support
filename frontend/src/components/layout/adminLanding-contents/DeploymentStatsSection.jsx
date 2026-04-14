import { Image, LayoutGrid } from "lucide-react";

export function DeploymentStatsSection({ stats }) {
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
            background: "#f3e8ff",
          }}
        >
          <LayoutGrid size={18} color="#a855f7" />
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
            Total Deployments
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
            background: "#dbeafe",
          }}
        >
          <Image size={18} color="#0ea5e9" />
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
            {stats.categories ? Object.keys(stats.categories).length : 0}
          </p>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>Categories</p>
        </div>
      </div>
    </div>
  );
}
