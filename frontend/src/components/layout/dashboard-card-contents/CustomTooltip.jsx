export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg p-3"
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: "6px",
          }}
        >
          {label}
        </p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{ width: 6, height: 6, background: entry.color }}
            />
            <span style={{ fontSize: "11px", color: "#64748b" }}>
              {entry.name}:{" "}
            </span>
            <span
              style={{ fontSize: "11px", fontWeight: 600, color: "#0f172a" }}
            >
              {(typeof entry.value === "number" &&
                entry.name?.toLowerCase().includes("revenue")) ||
              entry.name?.toLowerCase().includes("expenses")
                ? `$${entry.value.toLocaleString()}`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
