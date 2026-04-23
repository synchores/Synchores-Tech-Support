import { Copy, Pencil } from "lucide-react";
import { CmsActionMenu } from "../CmsActionMenu";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

function getCardImageSrc(imagePath) {
  return imagePath
    ? `${IMAGE_URL}${imagePath}`
    : "https://placehold.co/600x320/e2e8f0/64748b?text=No+Image";
}

export function DeploymentGalleryCard({ item, onEdit, onDuplicate }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--card)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.15)";
        e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(15, 23, 42, 0.08)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div className="relative h-40 overflow-hidden" style={{ background: "var(--accent)" }}>
        <img
          src={getCardImageSrc(item.image)}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold line-clamp-2" style={{ color: "var(--foreground)" }}>
              {item.title}
            </h3>
          </div>
          <CmsActionMenu
            actions={[
              {
                label: "Edit",
                icon: <Pencil size={14} />,
                onClick: () => onEdit(item.raw),
              },
              {
                label: "Duplicate",
                icon: <Copy size={14} />,
                onClick: () => onDuplicate(item.id),
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-2">
          <span
            style={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              borderRadius: "0.25rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              ...(item.status === "published"
                ? {
                    background: "#dcfce7",
                    color: "#166534",
                  }
                : item.status === "archived"
                ? {
                    background: "#f3f4f6",
                    color: "#6b7280",
                  }
                : {
                    background: "#fef3c7",
                    color: "#92400e",
                  }),
            }}
          >
            {item.status === "published"
              ? "Published"
              : item.status === "archived"
              ? "Archived"
              : "Draft"}
          </span>
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}
          >
            {item.category || "General"}
          </span>
        </div>

        <p className="text-xs line-clamp-2 flex-1" style={{ color: "var(--muted-foreground)" }}>
          {item.description}
        </p>

        <div
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
            borderTop: "1px solid var(--border)",
            paddingTop: "0.75rem",
          }}
        >
          Updated {new Date(item.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default DeploymentGalleryCard;
