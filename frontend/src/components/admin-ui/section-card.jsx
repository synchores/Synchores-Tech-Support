import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function SectionCard({
  title,
  subtitle,
  children,
  collapsible = false,
  defaultOpen = true,
  badge,
  open,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = () => {
    if (!collapsible) return;

    const nextOpen = !isOpen;
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  };

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        /* Match card look from Services/Deployment: light card + subtle border + soft shadow */
        backgroundColor: "#f8fafc",
        borderColor: "#e2e8f0",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{ borderColor: "#e2e8f0" }}
      >
        {collapsible ? (
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            className="section-card-trigger w-full flex items-center justify-between px-6 py-4"
          >
            <div className="flex items-center gap-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: `var(--foreground)` }}
                  >
                    {title}
                  </h3>
                  {badge && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `var(--destructive)`,
                        opacity: 0.2,
                        color: `var(--destructive)`,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: `var(--muted-foreground)` }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <div style={{ color: `var(--muted-foreground)` }}>
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>
        ) : (
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: `var(--foreground)` }}
                  >
                    {title}
                  </h3>
                  {badge && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `var(--destructive)`,
                        opacity: 0.2,
                        color: `var(--destructive)`,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: `var(--muted-foreground)` }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {collapsible ? (
        <div
          className="section-card-content"
          data-open={isOpen ? "true" : "false"}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <div className="p-6 space-y-5">{children}</div>
        </div>
      ) : (
        <div className="p-6 space-y-5">{children}</div>
      )}
    </div>
  );
}

export default SectionCard;
