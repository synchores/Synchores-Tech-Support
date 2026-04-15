import { X } from "lucide-react";

export function CmsDrawer({ open, title, onClose, children, actions }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(2, 6, 23, 0.48)",
          zIndex: 40,
        }}
      />

      <aside
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(560px, 100vw)",
          zIndex: 41,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
          boxShadow: "-16px 0 40px rgba(15, 23, 42, 0.12)",
          borderLeft: "2px solid var(--border)",
        }}
      >
        <header
          className="px-6 py-4 flex items-center justify-between flex-shrink-0"
          style={{
            borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
            background: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)" }}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              height: "32px",
              width: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              background: "white",
              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
            }}
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              background: "white",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: "1rem",
              padding: "1rem",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            {children}
          </div>
        </div>

        {actions && actions.length > 0 && (
          <footer
            className="flex-shrink-0 px-6 py-4 flex gap-3"
            style={{
              borderTop: "1px solid rgba(148, 163, 184, 0.25)",
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(10px)",
            }}
          >
            {actions.map((action) => (
              <button
                key={action.id || action.label}
                type="button"
                onClick={action.onClick}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "all 0.15s ease-in-out",
                  cursor: "pointer",
                  ...(action.variant === "danger"
                    ? {
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                      }
                    : {
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                      }),
                }}
                onMouseEnter={(e) => {
                  if (action.variant === "danger") {
                    e.currentTarget.style.background = "#dc2626";
                  } else {
                    e.currentTarget.style.background = "#2563eb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (action.variant === "danger") {
                    e.currentTarget.style.background = "#ef4444";
                  } else {
                    e.currentTarget.style.background = "#3b82f6";
                  }
                }}
              >
                {action.label}
              </button>
            ))}
          </footer>
        )}
      </aside>
    </div>
  );
}
