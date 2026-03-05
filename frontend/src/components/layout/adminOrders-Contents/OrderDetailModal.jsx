import { X } from "lucide-react";
import { statusConfig } from "./statusConfig";

const progressionSteps = [
  "PENDING_APPROVAL",
  "APPROVED",
  "ORDERED_FROM_SUPPLIER",
  "READY_FOR_BILLING",
  "PAID",
  "DELIVERED",
];

export function OrderDetailModal({ order, onClose, onStatusChange, allowedTransitions, transitionLoading }) {
  const s = statusConfig[order.status] ?? statusConfig.PENDING_APPROVAL;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-2xl overflow-hidden w-full max-w-lg" style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Order Details</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>#{order.orderId}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100"><X size={16} color="#64748b" /></button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Status Steps */}
          <div className="flex items-center gap-1">
            {progressionSteps.map((st, i, arr) => {
              const stConf = statusConfig[st];
              const currentIdx = progressionSteps.indexOf(order.status);
              const stepIdx = progressionSteps.indexOf(st);
              const isActive = order.status === st;
              const isPast = currentIdx > stepIdx;
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
              <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Client</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>User #{order.userId}</p>
              <p style={{ fontSize: "11px", color: "#64748b" }}>Product #{order.productId}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Order Date</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              <p style={{ fontSize: "11px", color: "#64748b" }}>Last Update: {new Date(order.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Order Summary</p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #f1f5f9" }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #f8fafc" }}>
                <p style={{ fontSize: "13px", color: "#1e293b" }}>Quantity</p>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{order.quantity}</p>
              </div>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #f8fafc" }}>
                <p style={{ fontSize: "13px", color: "#1e293b" }}>Unit Price</p>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>${Number(order.unitPrice).toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between px-4 py-3" style={{ background: "#f8fafc", borderTop: "2px solid #e2e8f0" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Total</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>${Number(order.totalPrice).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Update Status</p>
            <div className="flex gap-2 flex-wrap">
              {allowedTransitions.length === 0 && (
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>No further transitions available.</p>
              )}
              {allowedTransitions.map((st) => (
                <button
                  key={st}
                  onClick={() => onStatusChange(order.orderId, st)}
                  disabled={transitionLoading}
                  className="px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    fontSize: "12px", fontWeight: 600,
                    background: statusConfig[st].bg,
                    color: statusConfig[st].color,
                    border: `1px solid ${statusConfig[st].color}40`,
                    opacity: transitionLoading ? 0.6 : 1,
                    cursor: transitionLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {transitionLoading ? "Updating..." : `Move to ${statusConfig[st].label}`}
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
