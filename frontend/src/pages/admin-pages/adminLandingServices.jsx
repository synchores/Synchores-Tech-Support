import { useAdminLandingServicesPage } from "../../hooks/useAdminLandingServicesPage";
import { ServiceStatsSection } from "../../components/layout/adminLanding-contents/ServiceStatsSection";
import { ServiceDetailModal } from "../../components/layout/adminLanding-contents/ServiceDetailModal";
import { ServiceArchivedModePanel } from "../../components/layout/adminLanding-contents/ServiceArchivedModePanel";
import { ServiceCardsGrid } from "../../components/layout/adminLanding-contents/ServiceCardsGrid";
import { ServicePaginationFooter } from "../../components/layout/adminLanding-contents/ServicePaginationFooter";
import { CmsToolbar } from "../../components/admin-ui/CmsToolbar";
import { CmsDataTable } from "../../components/admin-ui/CmsDataTable";

export function AdminLandingServices() {
  const {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    showArchived,
    view,
    setView,
    currentPage,
    pageSize,
    selectedIds,
    drawerOpen,
    editingService,
    loading,
    error,
    queryErrorMessage,
    stats,
    categories,
    paginatedServices,
    totalItems,
    totalPages,
    pageStart,
    pageEnd,
    toolbarStatus,
    handleStatusFilterChange,
    handleToggleArchived,
    handleGoToPage,
    handlePageSizeChange,
    handleToggleSelect,
    handleToggleSelectAll,
    openCreate,
    openEdit,
    closeDrawer,
    clearSelection,
    handleBulkPublish,
    handleBulkArchive,
    handleSingleStatusChange,
    handleDuplicate,
    handleSubmit,
    handleRetryFetch,
  } = useAdminLandingServicesPage();

  return (
    <div className="admin-page-shell" style={{ minHeight: "100vh" }}>
      <div className="p-6 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Service CMS
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Table-first content management for scalable service publishing.
          </p>
        </div>

        <ServiceStatsSection stats={stats} />

        <CmsToolbar
          search={search}
          onSearchChange={setSearch}
          status={toolbarStatus}
          onStatusChange={handleStatusFilterChange}
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
          view={view}
          onViewChange={setView}
          onCreate={openCreate}
          createLabel="+ New Service"
          selectedCount={selectedIds.length}
          onBulkPublish={handleBulkPublish}
          onBulkArchive={handleBulkArchive}
          onClearSelection={clearSelection}
        />

        <ServiceArchivedModePanel
          showArchived={showArchived}
          archivedCount={stats.archived}
          onToggleArchived={handleToggleArchived}
        />

        {error && (
          <div
            className="rounded-lg border px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            style={{
              borderColor: "#f59e0b",
              background: "rgba(245, 158, 11, 0.12)",
              color: "var(--foreground)",
            }}
          >
            <p className="text-sm">{queryErrorMessage}</p>
            <button
              type="button"
              onClick={handleRetryFetch}
              className="text-xs px-3 py-1.5 rounded-md border"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              Retry
            </button>
          </div>
        )}

        {view === "table" ? (
          <CmsDataTable
            items={paginatedServices}
            itemType="services"
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onEdit={openEdit}
            onDuplicate={handleDuplicate}
            onToggleStatus={handleSingleStatusChange}
            onStatusChange={handleSingleStatusChange}
          />
        ) : (
          <ServiceCardsGrid
            items={paginatedServices}
            onEdit={openEdit}
            onDuplicate={handleDuplicate}
          />
        )}

        <ServicePaginationFooter
          totalItems={totalItems}
          pageStart={pageStart}
          pageEnd={pageEnd}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageSizeChange={handlePageSizeChange}
          onGoToPage={handleGoToPage}
        />

        <ServiceDetailModal
          open={drawerOpen}
          service={editingService}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />

        {loading && (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Refreshing services...
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminLandingServices;
