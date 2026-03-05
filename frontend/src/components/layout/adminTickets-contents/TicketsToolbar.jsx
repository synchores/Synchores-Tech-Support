import { Search } from "lucide-react";
import NewTicketButton from "../../buttons/NewTicketButton";

export function TicketsToolbar({ 
  search, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  priorityFilter, 
  onPriorityChange, 
  categoryFilter, 
  onCategoryChange, 
  onNewClick 
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-48" style={{ border: "1px solid #e2e8f0", background: "#fafafa" }}>
        <Search size={14} color="#94a3b8" />
        <input 
          value={search} 
          onChange={e => onSearchChange(e.target.value)} 
          placeholder="Search tickets..." 
          style={{ background: "transparent", border: "none", outline: "none", fontSize: "13px", color: "#0f172a", width: "100%" }} 
        />
      </div>
      <select 
        value={statusFilter} 
        onChange={e => onStatusChange(e.target.value)} 
        style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", outline: "none", background: "#fafafa", color: "#374151" }}
      >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>
      <select 
        value={priorityFilter} 
        onChange={e => onPriorityChange(e.target.value)} 
        style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", outline: "none", background: "#fafafa", color: "#374151" }}
      >
        <option value="all">All Priority</option>
        <option value="critical">Critical</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select 
        value={categoryFilter} 
        onChange={e => onCategoryChange(e.target.value)} 
        style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", outline: "none", background: "#fafafa", color: "#374151" }}
      >
        <option value="all">All Categories</option>
        {["network","hardware","software","security","billing","cloud"].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
      </select>
      <NewTicketButton onClick={onNewClick} />
    </div>
  );
}
