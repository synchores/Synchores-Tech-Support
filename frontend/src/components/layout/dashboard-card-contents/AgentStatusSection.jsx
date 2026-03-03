import { ArrowRight } from "lucide-react";
import { agents } from "../../../pages/data/mockData";

export function AgentStatusSection() {
  return (
    <div
      className="rounded-lg sm:rounded-xl overflow-hidden"
      style={{ background: "white", border: "1px solid #e2e8f0" }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4"
        style={{ borderBottom: "1px solid #f1f5f9" }}
      >
        <div>
          <h3
            style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}
            className="sm:text-base"
          >
            Agent Status
          </h3>
          <p
            style={{ fontSize: "11px", color: "#94a3b8" }}
            className="sm:text-xs"
          >
            Real-time workloads
          </p>
        </div>
        <a
          href="/agents"
          style={{
            fontSize: "11px",
            color: "#3b82f6",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="sm:text-sm whitespace-nowrap"
        >
          Manage <ArrowRight size={12} />
        </a>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-0"
        style={{ borderBottom: "none" }}
      >
        {agents.map((agent, i) => {
          const statusConf = {
            online: { color: "#22c55e", label: "Online" },
            offline: { color: "#94a3b8", label: "Offline" },
            busy: { color: "#f59e0b", label: "Busy" },
          }[agent.status];
          return (
            <div
              key={agent.id}
              className="flex flex-col items-center gap-1 py-2 sm:py-3 md:py-4 px-1 sm:px-2"
              style={{
                borderRight:
                  i < agents.length - 1 ? "1px solid #f1f5f9" : "none",
                textAlign: "center",
              }}
            >
              <div className="relative">
                <div
                  className="rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {agent.avatar}
                </div>
                <div
                  className="absolute bottom-0 right-0 rounded-full border-2 border-white w-2 h-2 sm:w-2.5 sm:h-2.5"
                  style={{ background: statusConf.color }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "#1e293b",
                  }}
                  className="sm:text-xs"
                >
                  {agent.name.split(" ")[0]}
                </p>
                <p
                  style={{ fontSize: "8px", color: "#94a3b8" }}
                  className="sm:text-xs"
                >
                  {agent.activeTickets}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
