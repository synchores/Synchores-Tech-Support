import { Search, Eye } from "lucide-react";
import { statusConfig } from "./statusConfig";

export function OrdersTableSection({
  filtered,
  orderList,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  setDetailOrder,
  totalRevenue,
  isLoading,
  error,
}) {
  return (
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
              {["Order ID", "User", "Product", "Qty", "Unit Price", "Total", "Date", "Status", "Actions"].map(h => (
                <th key={h} style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textAlign: "left", padding: "10px 16px", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={9} style={{ padding: "24px 16px", fontSize: "13px", color: "#64748b", textAlign: "center" }}>
                  Loading orders...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={9} style={{ padding: "24px 16px", fontSize: "13px", color: "#dc2626", textAlign: "center" }}>
                  Failed to load orders. Please refresh.
                </td>
              </tr>
            )}

            {!isLoading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={9} style={{ padding: "24px 16px", fontSize: "13px", color: "#64748b", textAlign: "center" }}>
                  No orders found for the current filter.
                </td>
              </tr>
            )}

            {!isLoading && !error && filtered.map((o) => {
              const s = statusConfig[o.status] ?? statusConfig.PENDING_APPROVAL;
              const Icon = s.icon;
              return (
                <tr key={o.orderId} style={{ borderTop: "1px solid #f8fafc" }} className="hover:bg-slate-50 transition-colors">
                  <td style={{ padding: "12px 16px", fontSize: "12px", fontWeight: 700, color: "#3b82f6", whiteSpace: "nowrap" }}>#{o.orderId}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>User #{o.userId}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8" }}>Updated {new Date(o.updatedAt).toLocaleDateString()}</p>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1e293b", whiteSpace: "nowrap" }}>Product #{o.productId}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>{o.quantity}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#0f172a", whiteSpace: "nowrap" }}>${Number(o.unitPrice).toFixed(2)}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>${Number(o.totalPrice).toFixed(2)}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#94a3b8", whiteSpace: "nowrap" }}>{new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
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
          Total Revenue: <span style={{ color: "#22c55e" }}>${totalRevenue.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
