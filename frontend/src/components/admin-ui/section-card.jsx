import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function SectionCard({
  title,
  subtitle,
  children,
  collapsible = false,
  defaultOpen = true,
  badge,
}) {
  const [open, setOpen] = useState(defaultOpen);

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
        className={`flex items-center justify-between px-6 py-4 border-b transition-colors ${
          collapsible ? "cursor-pointer hover:opacity-80" : ""
        }`}
        style={{
		  borderColor: "#e2e8f0",
        }}
        onClick={collapsible ? () => setOpen(!open) : undefined}
      >
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
        {collapsible && (
          <div style={{ color: `var(--muted-foreground)` }}>
            {open ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {(!collapsible || open) && (
        <div className="p-6 space-y-5">{children}</div>
      )}
    </div>
  );
}

export default SectionCard;
