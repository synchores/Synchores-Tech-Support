export function TicketsFooter({ filtered, ticketList, selected, onMarkResolved, onClearSelection }) {
  return (
    <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: "1px solid #f1f5f9" }}>
      <p style={{ fontSize: "12px", color: "#94a3b8" }}>
        Showing {filtered.length} of {ticketList.length} tickets
      </p>
      {selected.length > 0 && (
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "12px", color: "#64748b" }}>{selected.length} selected</span>
          <button 
            onClick={onMarkResolved} 
            className="px-3 py-1.5 rounded-lg" 
            style={{ background: "#22c55e", color: "white", fontSize: "12px", fontWeight: 600 }}
          >
            Mark Resolved
          </button>
          <button 
            onClick={onClearSelection} 
            className="px-3 py-1.5 rounded-lg" 
            style={{ border: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b" }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
