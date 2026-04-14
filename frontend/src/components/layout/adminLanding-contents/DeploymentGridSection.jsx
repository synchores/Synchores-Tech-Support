import { Search, Trash2, Edit } from "lucide-react";
import { useMemo } from "react";

export function DeploymentGridSection({
  deployments,
  search,
  onSearchChange,
  onNew,
  onEdit,
  onDelete,
  isLoading,
}) {
  const filtered = useMemo(() => {
    return deployments.filter(
      (d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [deployments, search]);

  const handleDelete = async (e, deployment) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${deployment.title}"?`)) {
      await onDelete(deployment.id);
    }
  };

  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-4"
      style={{ background: "white", border: "1px solid #e2e8f0" }}
    >
      {/* Toolbar */}
      <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <div className="flex-1 relative">
          <Search
            size={18}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}
          />
          <input
            type="text"
            placeholder="Search deployments..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg"
            style={{
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              background: "white",
              color: "#0f172a",
            }}
          />
        </div>
        <button
          onClick={onNew}
          className="px-4 py-2 rounded-lg font-semibold whitespace-nowrap"
          style={{
            background: "#ef4444",
            color: "white",
            fontSize: "14px",
          }}
        >
          + New Deployment
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ color: "#94a3b8" }}>Loading...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ color: "#94a3b8" }}>No deployments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((deployment) => (
            <div
              key={deployment.id}
              className="rounded-lg group hover:shadow-lg transition-shadow"
              style={{
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                overflow: "hidden",
              }}
            >
              {/* Image */}
              {deployment.image && (
                <img
                  src={deployment.image}
                  alt={deployment.title}
                  className="w-full h-40 object-cover"
                />
              )}

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {deployment.title}
                    </h3>
                    {deployment.category && (
                      <span
                        className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                        style={{
                          background: "#f0fdf4",
                          color: "#16a34a",
                        }}
                      >
                        {deployment.category}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {deployment.description}
                  </p>
                </div>

                {/* Actions */}
                <div
                  className="flex gap-2 pt-2"
                  style={{ borderTop: "1px solid #e2e8f0" }}
                >
                  <button
                    onClick={() => onEdit(deployment)}
                    className="flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      fontSize: "13px",
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, deployment)}
                    className="flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    style={{
                      background: "#fee2e2",
                      color: "#ef4444",
                      fontSize: "13px",
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="pt-4 text-end"
        style={{ borderTop: "1px solid #e2e8f0", fontSize: "13px", color: "#64748b" }}
      >
        Showing {filtered.length} of {deployments.length} deployments
      </div>
    </div>
  );
}
