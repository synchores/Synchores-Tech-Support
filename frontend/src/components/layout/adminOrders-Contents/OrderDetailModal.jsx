import { X } from "lucide-react";
import { statusConfig } from "./statusConfig";

export function OrderDetailModal({ order, onClose, onStatusChange }) {
  const s = statusConfig[order.status];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-2xl overflow-hidden w-full max-w-lg" style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Order Details</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>{order.id}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100"><X size={16} color="#64748b" /></button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Status Steps */}
          <div className="flex items-center gap-1">
            {["pending","processing","shipped","delivered"].map((st, i, arr) => {
              const stConf = statusConfig[st];
              const statuses = ["pending","processing","shipped","delivered","cancelled"];
              const currentIdx = statuses.indexOf(order.status);
              const stepIdx = statuses.indexOf(st);
              const isActive = order.status === st;
              const isPast = order.status !== "cancelled" && currentIdx > stepIdx;
              const Icon = stConf.icon;
              return (
                <div key={st} className="flex items-center" style={{ flex: 1 }}>
                  <div className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
                    <div className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: isActive ? stConf.color : isPast ? "#22c55e" : "#f1f5f9" }}>
                      <Icon size={14} color={isActive || isPast ? "white" : "#94a3b8"} />
                    </div>
                    <p style={{ fontSize: "10px", color: isActive ? stConf.color : isPast ? "#22c55e" : "#94a3b8", fontWeight: isActive ? 700 : 400 }}>{stConf.label}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ height: "2px", flex: 1, marginBottom: "14px", background: isPast ? "#22c55e" : "#f1f5f9" }} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Customer</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{order.customer}</p>
              <p style={{ fontSize: "11px", color: "#64748b" }}>{order.customerEmail}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Order Date</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              <p style={{ fontSize: "11px", color: "#64748b" }}>Payment: {order.paymentMethod}</p>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Order Items</p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #f1f5f9" }}>
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: i < order.items.length - 1 ? "1px solid #f8fafc" : "none" }}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#1e293b" }}>{item.name}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8" }}>Qty: {item.qty} × ${item.price.toLocaleString()}</p>
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>${(item.qty * item.price).toLocaleString()}</p>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3" style={{ background: "#f8fafc", borderTop: "2px solid #e2e8f0" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Total</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>${order.total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Update Status</p>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(statusConfig).map(st => (
                <button
                  key={st}
                  onClick={() => onStatusChange(order.id, st)}
                  className="px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    fontSize: "12px", fontWeight: 600,
                    background: order.status === st ? statusConfig[st].color : statusConfig[st].bg,
                    color: order.status === st ? "white" : statusConfig[st].color,
                    border: `1px solid ${statusConfig[st].color}40`,
                  }}
                >
                  {statusConfig[st].label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4" style={{ borderTop: "1px solid #f1f5f9" }}>
          <button onClick={onClose} className="w-full py-2.5 rounded-xl" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "13px", fontWeight: 600, color: "#64748b" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
