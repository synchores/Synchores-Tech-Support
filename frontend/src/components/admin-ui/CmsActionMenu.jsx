import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";

const MENU_WIDTH = 232;
const VIEWPORT_PADDING = 8;
const MENU_GAP = 6;

export function CmsActionMenu({ actions }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let nextLeft = rect.right - MENU_WIDTH;
    if (nextLeft < VIEWPORT_PADDING) {
      nextLeft = Math.min(
        rect.left,
        viewportWidth - MENU_WIDTH - VIEWPORT_PADDING,
      );
    }
    nextLeft = Math.max(VIEWPORT_PADDING, nextLeft);

    let nextTop = rect.bottom + MENU_GAP;
    const menuHeight = menuRef.current?.offsetHeight ?? 0;
    if (
      menuHeight > 0 &&
      nextTop + menuHeight > viewportHeight - VIEWPORT_PADDING
    ) {
      nextTop = Math.max(
        VIEWPORT_PADDING,
        rect.top - menuHeight - MENU_GAP,
      );
    }

    setPosition({ top: nextTop, left: nextLeft });
  };

  useEffect(() => {
    if (!open) return undefined;

    const handleOutsideClick = (event) => {
      const clickedTrigger = triggerRef.current?.contains(event.target);
      const clickedMenu = menuRef.current?.contains(event.target);
      if (!clickedTrigger && !clickedMenu) setOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleViewportChange = () => {
      setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    updatePosition();
    const frame = window.requestAnimationFrame(updatePosition);
    return () => window.cancelAnimationFrame(frame);
  }, [open, actions.length]);

  return (
    <div className="inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        title="Open row actions"
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
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open row actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${MENU_WIDTH}px`,
              zIndex: 1200,
              borderRadius: "0.625rem",
              overflow: "hidden",
              backgroundColor: "var(--card, #ffffff)",
              border: "1px solid var(--border)",
              boxShadow: "0 16px 36px rgba(15, 23, 42, 0.18)",
              opacity: 1,
              isolation: "isolate",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
            }}
          >
            {actions.map((action, idx) => {
              const isDanger = action.tone === "danger";
              const prevAction = idx > 0 ? actions[idx - 1] : null;
              const showDivider = prevAction && prevAction.tone !== action.tone;

              return (
                <div key={action.label}>
                  {showDivider && (
                    <div style={{ height: "1px", background: "var(--border)" }} />
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    disabled={action.disabled}
                    onClick={() => {
                      setOpen(false);
                      action.onClick();
                    }}
                    style={{
                      width: "100%",
                      padding: "0.625rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      lineHeight: 1.35,
                      opacity: action.disabled ? 0.5 : 1,
                      cursor: action.disabled ? "not-allowed" : "pointer",
                      border: "none",
                      backgroundColor: "var(--card, #ffffff)",
                      color: isDanger ? "#ef4444" : "var(--foreground)",
                      transition: "background-color 0.15s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      if (!action.disabled) {
                        e.currentTarget.style.backgroundColor = "var(--accent, #f1f5f9)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--card, #ffffff)";
                    }}
                  >
                    {action.icon}
                    <span style={{ flex: 1, textAlign: "left" }}>{action.label}</span>
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )
      )}
    </div>
  );
}
