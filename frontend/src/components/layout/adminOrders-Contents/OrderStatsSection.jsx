import { statusConfig } from "./statusConfig";

export function OrderStatsSection({ orderList }) {
  return (
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
  );
}
