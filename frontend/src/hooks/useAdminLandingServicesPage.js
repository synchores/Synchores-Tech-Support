import { useEffect, useMemo, useState } from "react";
import { useLandingServices } from "./useLandingPageData";
import { toastError, toastSuccess } from "../services/admin-service/adminToast";

const STATUS_ORDER = ["published", "draft", "archived"];

export function useAdminLandingServicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showArchived, setShowArchived] = useState(false);
  const [view, setView] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const { services: allServices } = useLandingServices();

  const {
    services,
    loading,
    createService,
    updateService,
    duplicateService,
    bulkUpdateServiceStatus,
  } = useLandingServices({
    search,
    status: showArchived
      ? "archived"
      : statusFilter === "all" || statusFilter === "archived"
      ? ""
      : statusFilter,
    category: categoryFilter === "all" ? "" : categoryFilter,
  });

  const normalized = useMemo(() => {
    const sorted = [...services].sort((a, b) => {
      const rankA = STATUS_ORDER.indexOf(a.status || "draft");
      const rankB = STATUS_ORDER.indexOf(b.status || "draft");
      if (rankA !== rankB) return rankA - rankB;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sorted.map((service) => ({
      id: service.cardId,
      title: service.title,
      description: service.description,
      image: service.image,
      category: service.category || "General",
      status: service.status || "draft",
      updatedAt: service.updatedAt,
      raw: service,
    }));
  }, [services]);

  const visibleServices = useMemo(() => {
    if (showArchived) {
      return normalized.filter((item) => item.status === "archived");
    }

    const activeOnly = normalized.filter((item) => item.status !== "archived");
    if (statusFilter === "all" || statusFilter === "archived") {
      return activeOnly;
    }

    return activeOnly.filter((item) => item.status === statusFilter);
  }, [normalized, showArchived, statusFilter]);

  const totalItems = visibleServices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalItems);

  const paginatedServices = useMemo(() => {
    return visibleServices.slice(pageStart, pageStart + pageSize);
  }, [visibleServices, pageStart, pageSize]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        (allServices || [])
          .map((item) => item.category || "General")
          .filter(Boolean)
      )
    ).sort();
  }, [allServices]);

  const stats = useMemo(() => {
    const source = allServices || [];
    return {
      total: source.length,
      published: source.filter((item) => item.status === "published").length,
      draft: source.filter((item) => (item.status || "draft") === "draft").length,
      archived: source.filter((item) => item.status === "archived").length,
    };
  }, [allServices]);

  const openCreate = () => {
    setEditingService(null);
    setDrawerOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingService(null);
  };

  const clearSelection = () => setSelectedIds([]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [search, statusFilter, categoryFilter, showArchived, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      setSelectedIds([]);
    }
  }, [currentPage, totalPages]);

  const handleToggleArchived = (checked) => {
    setShowArchived(checked);
    setStatusFilter("all");
  };

  const handleStatusFilterChange = (nextStatus) => {
    if (nextStatus === "archived") {
      setShowArchived(true);
      setStatusFilter("all");
      return;
    }

    if (showArchived) {
      setShowArchived(false);
    }
    setStatusFilter(nextStatus);
  };

  const handleGoToPage = (nextPage) => {
    const clamped = Math.min(totalPages, Math.max(1, nextPage));
    if (clamped === currentPage) return;
    setCurrentPage(clamped);
    setSelectedIds([]);
  };

  const handlePageSizeChange = (nextPageSize) => {
    setPageSize(nextPageSize);
    setSelectedIds([]);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (checked) => {
    setSelectedIds(checked ? paginatedServices.map((item) => item.id) : []);
  };

  const handleSingleStatusChange = async (id, status) => {
    try {
      await updateService({ cardId: id, status });
      toastSuccess("Updated successfully", "Service status updated.");
    } catch (error) {
      toastError(error, "Update failed");
    }
  };

  const handleBulkPublish = async () => {
    if (!selectedIds.length) return;

    try {
      const ids = [...selectedIds];
      await bulkUpdateServiceStatus(ids, "published");
      clearSelection();
      toastSuccess("Updated successfully", "Selected services published.");
    } catch (error) {
      toastError(error, "Update failed");
    }
  };

  const handleBulkArchive = async () => {
    if (!selectedIds.length) return;

    try {
      const ids = [...selectedIds];
      await bulkUpdateServiceStatus(ids, "archived");
      clearSelection();
      toastSuccess("Updated successfully", "Selected services archived.");
    } catch (error) {
      toastError(error, "Update failed");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const cloned = await duplicateService(id);
      if (cloned) {
        openEdit(cloned);
        toastSuccess("Duplicated successfully", "Service duplicated.");
      }
    } catch (error) {
      toastError(error, "Duplicate failed");
    }
  };

  const handleSubmit = async (input) => {
    try {
      if (editingService?.cardId) {
        await updateService(input);
        toastSuccess("Updated successfully", "Service updated.");
        return;
      }

      await createService(input);
      toastSuccess("Created successfully", "Service created.");
    } catch (error) {
      toastError(error, editingService?.cardId ? "Update failed" : "Create failed");
      throw error;
    }
  };

  return {
    search,
    setSearch,
    statusFilter,
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
    stats,
    categories,
    paginatedServices,
    totalItems,
    totalPages,
    pageStart,
    pageEnd,
    toolbarStatus: showArchived ? "archived" : statusFilter,
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
  };
}
