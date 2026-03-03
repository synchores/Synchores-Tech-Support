import { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";

/**
 * @typedef {Object} HeaderProps
 * @property {string} title
 * @property {string} [subtitle]
 * @property {() => void} [onMobileMenuToggle]
 */

const notifications = [
  { id: 1, text: "Critical ticket TKT-007 assigned to Derek Washington", time: "5 min ago", unread: true, color: "#ef4444" },
  { id: 2, text: "Order ORD-2026-007 is now processing", time: "22 min ago", unread: true, color: "#f59e0b" },
  { id: 3, text: "New ticket TKT-016 requires agent assignment", time: "47 min ago", unread: true, color: "#3b82f6" },
  { id: 4, text: "Priya Nair resolved TKT-013 successfully", time: "1 hr ago", unread: false, color: "#22c55e" },
  { id: 5, text: "Invoice INV-2026-0214 flagged for review", time: "2 hr ago", unread: false, color: "#8b5cf6" },
];

export function Header({ title, subtitle, onMobileMenuToggle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header
      className="flex items-center justify-between px-6 sticky top-0 z-20"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        height: "64px",
        minHeight: "64px",
      }}
    >
        
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-slate-500 hover:text-slate-700"
          onClick={onMobileMenuToggle}
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1 }}>{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
       

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
            style={{ width: 38, height: 38, border: "1px solid #e2e8f0" }}
          >
            <Bell size={17} color="#64748b" />
            {unreadCount > 0 && (
              <span
                className="absolute top-1 right-1 flex items-center justify-center rounded-full"
                style={{ background: "#ef4444", color: "white", fontSize: "9px", fontWeight: 700, width: "14px", height: "14px" }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
              <div
                className="absolute right-0 mt-2 rounded-xl shadow-2xl z-40 overflow-hidden"
                style={{ width: "340px", background: "white", border: "1px solid #e2e8f0", top: "100%" }}
              >
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <p style={{ fontWeight: 700, fontSize: "14px", color: "#0f172a" }}>Notifications</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-white" style={{ fontSize: "10px", fontWeight: 700, background: "#ef4444" }}>{unreadCount} new</span>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={14} color="#94a3b8" />
                    </button>
                  </div>
                </div>
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    style={{ borderBottom: "1px solid #f8fafc", background: n.unread ? "rgba(59,130,246,0.02)" : "white" }}
                  >
                    <div className="rounded-full flex-shrink-0 mt-0.5" style={{ width: 8, height: 8, background: n.color, marginTop: "6px" }} />
                    <div className="flex-1">
                      <p style={{ fontSize: "12px", color: "#1e293b", lineHeight: 1.5 }}>{n.text}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{n.time}</p>
                    </div>
                    {n.unread && <div className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: "#3b82f6", marginTop: "6px" }} />}
                  </div>
                ))}
                <div className="px-4 py-3 text-center">
                  <button style={{ fontSize: "12px", color: "#3b82f6", fontWeight: 600 }}>View all notifications</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Admin Avatar */}
        <div
          className="rounded-full flex items-center justify-center cursor-pointer"
          style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0 }}
        >
          JD
        </div>
      </div>
    </header>
  );
}

export default Header;