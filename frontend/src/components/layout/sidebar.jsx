import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Ticket, ShoppingCart, Users, UserCircle,
  BarChart2, Settings, ChevronLeft, ChevronRight, Zap,
  Bell, LogOut, HelpCircle
} from "lucide-react";
import { useAuth } from "../../context/authContext.jsx";

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/tickets", label: "Tickets", icon: Ticket, badge: 9 },
    { to: "/admin/orders", label: "Orders", icon: ShoppingCart, badge: 3 },
    { to: "/agents", label: "Agents", icon: Users },
    { to: "/customers", label: "Customers", icon: UserCircle },
    { to: "/reports", label: "Reports", icon: BarChart2 },
    { to: "/admin/landing-page/hero", label: "Landing Page", icon: Settings },
  ];

  const bottomItems = [
    { to: "/settings", label: "Settings", icon: Settings },
  ];

/**
 * SidebarProps
 * @param {string} title
 * @param {string} [subtitle]
 * @param {() => void} [onMobileMenuToggle]
 */

export function Sidebar({ title, subtitle, onMobileMenuToggle }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const onToggle = () => setCollapsed((prev) => !prev);
  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 z-30"
      style={{
        width: collapsed ? "72px" : "240px",
        background: "#0f1629",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        minWidth: collapsed ? "72px" : "240px",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: "64px" }}>
        <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>
          <Zap size={18} color="white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="overflow-x-hidden!important">
            <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap" }}>TechDesk</p>
            <p style={{ color: "#64748b", fontSize: "11px", whiteSpace: "nowrap" }}>Admin Portal</p>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-x-hidden px-2 py-4 flex flex-col gap-1">
        {!collapsed && (
          <p style={{ color: "#475569", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", paddingLeft: "12px", marginBottom: "6px" }}>
            Main Menu
          </p>
        )}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all relative group ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`
            }
            style={({ isActive }) => ({
              background: isActive
                ? "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(99,102,241,0.1))"
                : "transparent",
              borderLeft: isActive ? "2px solid #3b82f6" : "2px solid transparent",
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ flexShrink: 0, color: isActive ? "#60a5fa" : undefined }}
                />
                {!collapsed && (
                  <span style={{ fontSize: "14px", fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span
                    className="ml-auto flex items-center justify-center rounded-full"
                    style={{ background: "#ef4444", color: "white", fontSize: "10px", fontWeight: 700, minWidth: "18px", height: "18px", padding: "0 4px" }}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span
                    className="absolute top-1.5 right-1.5 rounded-full"
                    style={{ background: "#ef4444", width: "7px", height: "7px" }}
                  />
                )}
                {/* Tooltip on collapsed */}
                {collapsed && (
                  <span
                    className="absolute left-full ml-3 px-2 py-1 rounded text-white text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    style={{ background: "#1e2a3b" }}
                  >
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        {!collapsed && (
          <p style={{ color: "#475569", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", paddingLeft: "12px", marginTop: "16px", marginBottom: "6px" }}>
            System
          </p>
        )}
        {bottomItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all relative group ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
              borderLeft: isActive ? "2px solid #3b82f6" : "2px solid transparent",
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <span style={{ fontSize: "14px", fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                )}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-2 py-1 rounded text-white text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50" style={{ background: "#1e2a3b" }}>
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 8px" }}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 34, height: 34, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", fontSize: "13px", fontWeight: 700, color: "white" }}>
              JD
            </div>
            <div className="flex-1 overflow-x-hidden">
              <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>John Doe</p>
              <p style={{ color: "#64748b", fontSize: "11px", whiteSpace: "nowrap" }}>Administrator</p>
            </div>
            <button 
              className="text-slate-500 hover:text-slate-300 transition-colors"
              onClick={handleLogout}
              >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="rounded-full flex items-center justify-center cursor-pointer" style={{ width: 34, height: 34, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", fontSize: "13px", fontWeight: 700, color: "white" }}>
              JD
            </div>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center transition-colors hover:text-white"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "10px",
          color: "#475569",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : (
          <div className="flex items-center gap-2" style={{ fontSize: "12px", color: "#475569" }}>
            <ChevronLeft size={16} />
            <span>Collapse</span>
          </div>
        )}
      </button>
    </aside>
  );
}

export default Sidebar;