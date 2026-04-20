import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DRAWER_ANIMATION_MS = 260;

function getActionStyles(variant = "primary") {
  if (variant === "danger") {
    return {
      base: { background: "#ef4444", color: "white", border: "none" },
      hover: "#dc2626",
    };
  }

  if (variant === "ghost") {
    return {
      base: {
        background: "white",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
      },
      hover: "#f1f5f9",
    };
  }

  return {
    base: { background: "#3b82f6", color: "white", border: "none" },
    hover: "#2563eb",
  };
}

export function CmsDrawer({ open, title, onClose, children, actions }) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let showTimer;
    let hideTimer;

    if (open) {
      setIsMounted(true);
      showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 16);
    } else if (isMounted) {
      setIsVisible(false);
      hideTimer = setTimeout(() => {
        setIsMounted(false);
      }, DRAWER_ANIMATION_MS);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [open, isMounted]);

  if (!isMounted) return null;

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
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${DRAWER_ANIMATION_MS}ms ease`,
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
          transform: isVisible ? "translateX(0)" : "translateX(100%)",
          opacity: isVisible ? 1 : 0.98,
          transition: `transform ${DRAWER_ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${DRAWER_ANIMATION_MS}ms ease`,
          willChange: "transform, opacity",
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
            {actions.map((action) => {
              const styles = getActionStyles(action.variant);

              return (
                <button
                  key={action.id || action.label}
                  type="button"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  aria-busy={action.loading ? true : undefined}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "all 0.15s ease-in-out",
                    cursor: action.disabled ? "not-allowed" : "pointer",
                    opacity: action.disabled ? 0.6 : 1,
                    ...styles.base,
                  }}
                  onMouseEnter={(e) => {
                    if (action.disabled) return;
                    e.currentTarget.style.background = styles.hover;
                  }}
                  onMouseLeave={(e) => {
                    if (action.disabled) return;
                    e.currentTarget.style.background = styles.base.background;
                  }}
                >
                  {action.loading
                    ? action.loadingLabel || `${action.label}...`
                    : action.label}
                </button>
              );
            })}
          </footer>
        )}
      </aside>
    </div>
  );
}
