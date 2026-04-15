import { useMemo, useState } from "react";
import { Copy, Eye, Pencil, Trash2 } from "lucide-react";
import { useDeploymentGallery } from "../../hooks/useLandingPageData";
import { DeploymentStatsSection } from "../../components/layout/adminLanding-contents/DeploymentStatsSection";
import { DeploymentDetailModal } from "../../components/layout/adminLanding-contents/DeploymentDetailModal";
import { CmsToolbar } from "../../components/admin-ui/CmsToolbar";
import { CmsDataTable } from "../../components/admin-ui/CmsDataTable";
import { CmsActionMenu } from "../../components/admin-ui/CmsActionMenu";

const STATUS_ORDER = ["published", "draft", "archived"];

export function AdminDeploymentGallery() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [view, setView] = useState("table");
  const [selectedIds, setSelectedIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDeployment, setEditingDeployment] = useState(null);

  const { deployments: allDeployments } = useDeploymentGallery();

  const {
    deployments,
    loading,
    createDeployment,
    updateDeployment,
    deleteDeployment,
    duplicateDeployment,
    bulkDeleteDeployments,
    bulkUpdateDeploymentStatus,
  } = useDeploymentGallery({
    search,
    status: statusFilter === "all" ? "" : statusFilter,
    category: categoryFilter === "all" ? "" : categoryFilter,
  });

  const normalized = useMemo(() => {
    const sorted = [...deployments].sort((a, b) => {
      const rankA = STATUS_ORDER.indexOf(a.status || "draft");
      const rankB = STATUS_ORDER.indexOf(b.status || "draft");
      if (rankA !== rankB) return rankA - rankB;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sorted.map((deployment) => ({
      id: deployment.deploymentId,
      title: deployment.title,
      description: deployment.description,
      image: deployment.image,
      category: deployment.category,
      status: deployment.status || "draft",
      updatedAt: deployment.updatedAt,
      raw: deployment,
    }));
  }, [deployments]);

  const categories = useMemo(() => {
    return Array.from(new Set((allDeployments || []).map((item) => item.category))).sort();
  }, [allDeployments]);

  const stats = useMemo(() => {
    const source = allDeployments || [];
    return {
      total: source.length,
      published: source.filter((item) => item.status === "published").length,
      draft: source.filter((item) => (item.status || "draft") === "draft").length,
      archived: source.filter((item) => item.status === "archived").length,
    };
  }, [allDeployments]);

  const clearSelection = () => setSelectedIds([]);

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (checked) => {
    setSelectedIds(checked ? normalized.map((item) => item.id) : []);
  };

  const openCreate = () => {
    setEditingDeployment(null);
    setDrawerOpen(true);
  };

  const openEdit = (deployment) => {
    setEditingDeployment(deployment);
    setDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this deployment item?")) return;
    await deleteDeployment(id);
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleSingleStatusChange = async (id, status) => {
    await updateDeployment({ deploymentId: id, status });
  };

  const handleDuplicate = async (id) => {
    const cloned = await duplicateDeployment(id);
    if (cloned) {
      openEdit(cloned);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected deployments?`)) return;
    await bulkDeleteDeployments(selectedIds);
    clearSelection();
  };

  const handleBulkPublish = async () => {
    if (!selectedIds.length) return;
    await bulkUpdateDeploymentStatus(selectedIds, "published");
    clearSelection();
  };

  const handleBulkArchive = async () => {
    if (!selectedIds.length) return;
    await bulkUpdateDeploymentStatus(selectedIds, "archived");
    clearSelection();
  };

  const handlePreview = (id) => {
    window.open(`/?preview=deployment&itemId=${id}`, "_blank");
  };

  const handleSubmit = async (input) => {
    if (editingDeployment?.deploymentId) {
      await updateDeployment(input);
      return;
    }

    await createDeployment(input);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <div className="p-6 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Deployment CMS
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Data-dense deployment management built for fast publishing workflows.
          </p>
        </div>

        <DeploymentStatsSection stats={stats} />

        <CmsToolbar
          search={search}
          onSearchChange={setSearch}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        view={view}
        onViewChange={setView}
        onCreate={openCreate}
        createLabel="+ New Deployment"
        selectedCount={selectedIds.length}
        onBulkDelete={handleBulkDelete}
        onBulkPublish={handleBulkPublish}
        onBulkArchive={handleBulkArchive}
        onClearSelection={clearSelection}
      />

      {view === "table" ? (
        <CmsDataTable
          items={normalized}
          itemType="deployments"
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onEdit={openEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onToggleStatus={handleSingleStatusChange}
          onStatusChange={handleSingleStatusChange}
          onPreview={handlePreview}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {normalized.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "white",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.15)";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(15, 23, 42, 0.08)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Image Container */}
              <div className="relative h-40 overflow-hidden bg-slate-100">
                <img
                  src={item.image ? `http://localhost:3000${item.image}` : "https://placehold.co/600x320/e2e8f0/64748b?text=No+Image"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="flex-1 p-4 flex flex-col gap-3">
                {/* Title + Status Header */}
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
                        onClick: () => openEdit(item.raw),
                      },
                      {
                        label: "Duplicate",
                        icon: <Copy size={14} />,
                        onClick: () => handleDuplicate(item.id),
                      },
                      {
                        label: "Preview in Landing Page",
                        icon: <Eye size={14} />,
                        onClick: () => handlePreview(item.id),
                      },
                      {
                        label: "Delete",
                        icon: <Trash2 size={14} />,
                        tone: "danger",
                        onClick: () => handleDelete(item.id),
                      },
                    ]}
                  />
                </div>

                {/* Metadata Row (Status + Category) */}
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
                    {item.status === "published" ? "Published" : item.status === "archived" ? "Archived" : "Draft"}
                  </span>
                  <span className="text-xs px-2 py-1 rounded" style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}>
                    {item.category || "General"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs line-clamp-2 flex-1" style={{ color: "var(--muted-foreground)" }}>
                  {item.description}
                </p>

                {/* Updated Date */}
                <div className="text-xs" style={{ color: "var(--muted-foreground)", borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
                  Updated {new Date(item.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeploymentDetailModal
        open={drawerOpen}
        deployment={editingDeployment}
        onClose={() => {
          setDrawerOpen(false);
          setEditingDeployment(null);
        }}
        onSubmit={handleSubmit}
      />

      {loading && (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Refreshing deployments...
        </p>
      )}
      </div>
    </div>
  );
}

export default AdminDeploymentGallery;
