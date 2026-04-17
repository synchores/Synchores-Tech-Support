import { Eye, Copy, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { CmsActionMenu } from "./CmsActionMenu";

const FALLBACK_IMAGE = "https://placehold.co/64x40/e2e8f0/64748b?text=No+Image";

function nextStatus(status) {
  if (status === "draft") return "published";
  if (status === "published") return "archived";
  return "draft";
}

function formatStatus(status) {
  if (status === "published") return "Published";
  if (status === "archived") return "Archived";
  return "Draft";
}

function statusColors(status) {
  if (status === "published") {
    return { bg: "#dcfce7", fg: "#166534" };
  }
  if (status === "archived") {
    return { bg: "#e2e8f0", fg: "#334155" };
  }
  return { bg: "#fef3c7", fg: "#92400e" };
}

export function CmsDataTable({
  items,
  itemType,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  onStatusChange,
  onPreview,
}) {
  const allSelected = items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  return (
    <div style={{ background: "white", borderRadius: "0.5rem", border: "1px solid var(--border)", overflow: "hidden" }}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[940px]">
          <thead style={{ background: "#fafafa", borderBottom: "1px solid var(--border)" }}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleSelectAll(e.target.checked)}
                  aria-label="Select all"
                  className="cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>Image</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>
                <span className="inline-flex items-center gap-1">
                  Updated At <ArrowUpDown size={12} />
                </span>
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase" style={{ color: "var(--muted-foreground)", letterSpacing: "0.5px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
                  No records found.
                </td>
              </tr>
            )}
            {items.map((item) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <tr
                  key={item.id}
                  style={{
                    borderTop: "1px solid var(--border)",
                    background: isSelected ? "#f1f5f9" : "white",
                    transition: "background-color 0.15s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "#fafafa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "white";
                    }
                  }}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(item.id)}
                      aria-label={`Select ${item.title}`}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={item.image ? `http://localhost:3000/${item.image}` : FALLBACK_IMAGE}
                      alt={item.title}
                      className="h-10 w-16 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)", maxWidth: 360, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--foreground)" }}>
                    {item.category || "General"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      {(() => {
                        const statusColor = statusColors(item.status);
                        return (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.375rem",
                              padding: "0.375rem 0.75rem",
                              borderRadius: "0.375rem",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              background: statusColor.bg,
                              color: statusColor.fg,
                              width: "fit-content",
                            }}
                          >
                            {formatStatus(item.status)}
                          </span>
                        );
                      })()}
                      <select
                        value={item.status || "draft"}
                        onChange={(e) => onStatusChange(item.id, e.target.value)}
                        style={{
                          width: "auto",
                          minWidth: "80px",
                          padding: "0.375rem 0.5rem",
                          backgroundColor: "var(--input-background)",
                          color: "var(--foreground)",
                          border: "1px solid var(--border)",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          transition: "all 0.15s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
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
                        {
                          label: `Set ${formatStatus(nextStatus(item.status))}`,
                          icon: <ArrowUpDown size={14} />,
                          onClick: () => onToggleStatus(item.id, nextStatus(item.status)),
                        },
                        {
                          label: "Preview in Landing Page",
                          icon: <Eye size={14} />,
                          onClick: () => onPreview(item.id),
                        },
                        {
                          label: "Delete",
                          icon: <Trash2 size={14} />,
                          tone: "danger",
                          onClick: () => onDelete(item.id),
                        },
                      ]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)", borderTop: "1px solid var(--border)" }}>
        Showing {items.length} {itemType}
      </div>
    </div>
  );
}
