import { useState, useMemo } from "react";
import { Search, Eye } from "lucide-react";
import { orders as initialOrders } from "../../../pages/data/mockData";
import { statusConfig } from "./statusConfig";
import { OrderDetailModal } from "./OrderDetailModal";

export function AdminOrders() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailOrder, setDetailOrder] = useState(null);

  const filtered = useMemo(() => orderList.filter(o => {
    const q = search.toLowerCase();
    if (q && !o.id.toLowerCase().includes(q) && !o.customer.toLowerCase().includes(q)) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return true;
  }), [orderList, search, statusFilter]);

  const totalRevenue = orderList.filter(o => o.status !== "cancelled").reduce((acc, o) => acc + o.total, 0);
  const pendingCount = orderList.filter(o => o.status === "pending" || o.status === "processing").length;

  function handleStatusChange(id, status) {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    if (detailOrder?.id === id) setDetailOrder(prev => prev ? { ...prev, status } : null);
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "white", border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>Total Orders</p>
          <p style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a" }}>{orderList.length}</p>
        </div>
        {["pending","processing","shipped","delivered"].map(st => {
          const conf = statusConfig[st];
          const count = orderList.filter(o => o.status === st).length;
          return (
            <div key={st} className="rounded-xl p-4 flex items-center gap-3" style={{ background: "white", border: "1px solid #e2e8f0" }}>
              <div className="rounded-xl flex items-center justify-center" style={{ width: 38, height: 38, background: conf.bg }}>
                <conf.icon size={17} color={conf.color} />
              </div>
              <div>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{count}</p>
                <p style={{ fontSize: "11px", color: "#94a3b8" }}>{conf.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "white", border: "1px solid #e2e8f0" }}>
        <div className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-48" style={{ border: "1px solid #e2e8f0", background: "#fafafa" }}>
            <Search size={14} color="#94a3b8" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." style={{ background: "transparent", border: "none", outline: "none", fontSize: "13px", width: "100%" }} />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", outline: "none", background: "#fafafa", color: "#374151" }}>
            <option value="all">All Status</option>
            {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["Order ID","Customer","Items","Region","Total","Payment","Date","Status","Actions"].map(h => (
                  <th key={h} style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textAlign: "left", padding: "10px 16px", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => {
                const s = statusConfig[o.status];
                const Icon = s.icon;
                return (
                  <tr key={o.id} style={{ borderTop: "1px solid #f8fafc" }} className="hover:bg-slate-50 transition-colors">
                    <td style={{ padding: "12px 16px", fontSize: "12px", fontWeight: 700, color: "#3b82f6", whiteSpace: "nowrap" }}>{o.id}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{o.customer}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8" }}>{o.customerEmail}</p>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "12px", color: "#1e293b" }}>{o.items[0].name.slice(0, 28)}{o.items[0].name.length > 28 ? "…" : ""}</p>
                      {o.items.length > 1 && <p style={{ fontSize: "11px", color: "#94a3b8" }}>+{o.items.length - 1} more item{o.items.length > 2 ? "s" : ""}</p>}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>{o.region}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>${o.total.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>{o.paymentMethod}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#94a3b8", whiteSpace: "nowrap" }}>{new Date(o.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit" style={{ background: s.bg }}>
                        <Icon size={11} color={s.color} />
                        <span style={{ fontSize: "11px", fontWeight: 600, color: s.color }}>{s.label}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button onClick={() => setDetailOrder(o)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors" style={{ border: "1px solid #e2e8f0", fontSize: "11px", fontWeight: 600, color: "#64748b" }}>
                        <Eye size={11} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>Showing {filtered.length} of {orderList.length} orders</p>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
            Total Revenue: <span style={{ color: "#22c55e" }}>${totalRevenue.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
