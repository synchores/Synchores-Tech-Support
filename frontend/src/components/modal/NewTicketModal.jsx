import { useState } from "react";
import { X } from "lucide-react";

export function NewTicketModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", customer: "", priority: "medium", category: "network", description: "" });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="rounded-2xl overflow-hidden w-full max-w-lg" style={{ background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Create New Ticket</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100"><X size={16} color="#64748b" /></button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Brief description of the issue" style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#fafafa" }} />
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Customer *</label>
            <input value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} placeholder="Customer name or company" style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#fafafa" }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#fafafa" }}>
                {["critical","high","medium","low"].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#fafafa" }}>
                {["network","hardware","software","security","billing","cloud"].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detailed description..." rows={3} style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#fafafa", resize: "none" }} />
          </div>
        </div>
        <div className="px-6 py-4 flex gap-3" style={{ borderTop: "1px solid #f1f5f9" }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl" style={{ border: "1px solid #e2e8f0", fontSize: "13px", color: "#64748b", fontWeight: 600 }}>Cancel</button>
          <button onClick={() => { if (form.title && form.customer) { onSubmit(form); onClose(); } }} className="flex-1 py-2.5 rounded-xl" style={{ background: "#3b82f6", color: "white", fontSize: "13px", fontWeight: 600 }}>Create Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default NewTicketModal;


