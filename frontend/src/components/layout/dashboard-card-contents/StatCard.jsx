import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  color,
  bg,
}) {
  const isPositive = change >= 0;
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
              marginTop: "4px",
            }}
          >
            {value}
          </p>
        </div>
        <div
          className="rounded-xl flex items-center justify-center"
          style={{ width: 44, height: 44, background: bg }}
        >
          <Icon size={20} color={color} strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp size={13} color="#22c55e" />
        ) : (
          <TrendingDown size={13} color="#ef4444" />
        )}
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: isPositive ? "#22c55e" : "#ef4444",
          }}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
          {changeLabel}
        </span>
      </div>
    </div>
  );
}
