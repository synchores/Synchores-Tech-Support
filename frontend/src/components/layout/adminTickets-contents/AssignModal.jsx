import { useState } from "react";
import { X } from "lucide-react";
import { agents } from "../../../pages/data/mockData";

export function AssignModal({ ticket, onClose, onAssign }) {
  const [selected, setSelected] = useState(ticket.assignedAgent || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-2xl overflow-hidden w-full max-w-md" style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Assign Agent</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>{ticket.id} — {ticket.title.slice(0, 40)}...</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100">
            <X size={16} color="#64748b" />
          </button>
        </div>
        <div className="px-6 py-4">
          <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>Select an available agent to handle this ticket:</p>
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
            {agents.map(agent => {
              const statusConf = { online: { color: "#22c55e", label: "Online" }, offline: { color: "#94a3b8", label: "Offline" }, busy: { color: "#f59e0b", label: "Busy" } }[agent.status];
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelected(agent.name)}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                  style={{
                    border: selected === agent.name ? "2px solid #3b82f6" : "2px solid #f1f5f9",
                    background: selected === agent.name ? "#eff6ff" : "white",
                  }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="rounded-full flex items-center justify-center" style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", fontSize: "12px", fontWeight: 700, color: "white" }}>
                      {agent.avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 rounded-full border-2 border-white" style={{ width: 9, height: 9, background: statusConf.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{agent.name}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8" }}>{agent.role}</p>
                  </div>
                  <div className="text-right">
                    <span style={{ fontSize: "10px", fontWeight: 700, color: statusConf.color, background: `${statusConf.color}18`, padding: "2px 8px", borderRadius: "20px" }}>
                      {statusConf.label}
                    </span>
                    <p style={{ fontSize: "10px", color: "#94a3b8", marginTop: "2px" }}>{agent.activeTickets} active</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="px-6 py-4 flex gap-3" style={{ borderTop: "1px solid #f1f5f9" }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl" style={{ border: "1px solid #e2e8f0", fontSize: "13px", color: "#64748b", fontWeight: 600 }}>
            Cancel
          </button>
          <button
            onClick={() => { if (selected) { onAssign(selected); onClose(); } }}
            disabled={!selected}
            className="flex-1 py-2.5 rounded-xl transition-opacity"
            style={{ background: selected ? "#3b82f6" : "#e2e8f0", color: selected ? "white" : "#94a3b8", fontSize: "13px", fontWeight: 600 }}
          >
            Assign Agent
          </button>
        </div>
      </div>
    </div>
  );
}
