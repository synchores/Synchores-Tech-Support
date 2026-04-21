import { useAdminDeploymentGalleryPage } from "../../hooks/useAdminDeploymentGalleryPage";
import { DeploymentStatsSection } from "../../components/layout/adminLanding-contents/DeploymentStatsSection";
import { DeploymentDetailModal } from "../../components/layout/adminLanding-contents/DeploymentDetailModal";
import { CmsToolbar } from "../../components/admin-ui/CmsToolbar";
import { DeploymentGalleryHeader } from "../../components/admin-ui/gallery-section/DeploymentGalleryHeader";
import { DeploymentGalleryContentSection } from "../../components/admin-ui/gallery-section/DeploymentGalleryContentSection";

export function AdminDeploymentGallery() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    view,
    setView,
    selectedIds,
    drawerOpen,
    editingDeployment,
    loading,
    normalized,
    categories,
    stats,
    clearSelection,
    handleToggleSelect,
    handleToggleSelectAll,
    openCreate,
    openEdit,
    closeDrawer,
    handleSingleStatusChange,
    handleDuplicate,
    handleBulkPublish,
    handleBulkArchive,
    handleSubmit,
  } = useAdminDeploymentGalleryPage();

  return (
    <div className="admin-page-shell" style={{ minHeight: "100vh" }}>
      <div className="p-6 flex flex-col gap-5">
        <DeploymentGalleryHeader />

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
          onBulkPublish={handleBulkPublish}
          onBulkArchive={handleBulkArchive}
          onClearSelection={clearSelection}
        />

        <DeploymentGalleryContentSection
          view={view}
          normalized={normalized}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onEdit={openEdit}
          onDuplicate={handleDuplicate}
          onStatusChange={handleSingleStatusChange}
        />

        <DeploymentDetailModal
          open={drawerOpen}
          deployment={editingDeployment}
          onClose={closeDrawer}
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
