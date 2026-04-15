import { LayoutGrid, Eye, FileEdit, Archive } from "lucide-react";

export function DeploymentStatsSection({ stats }) {
  const cards = [
    {
      label: "Total",
      value: stats.total,
      icon: LayoutGrid,
      iconBg: "#f3e8ff",
      iconColor: "#a855f7",
    },
    {
      label: "Published",
      value: stats.published,
      icon: Eye,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      label: "Draft",
      value: stats.draft,
      icon: FileEdit,
      iconBg: "#fef3c7",
      iconColor: "#d97706",
    },
    {
      label: "Archived",
      value: stats.archived,
      icon: Archive,
      iconBg: "#e2e8f0",
      iconColor: "#475569",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              background: "white",
              borderRadius: "0.5rem",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div
              className="rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                width: 44,
                height: 44,
                background: card.iconBg,
              }}
            >
              <Icon size={20} color={card.iconColor} />
            </div>
            <div>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "var(--foreground)",
                  lineHeight: 1,
                }}
              >
                {card.value}
              </p>
              <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontWeight: 500 }}>
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
