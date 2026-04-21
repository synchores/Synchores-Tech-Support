import { useState } from "react";
import { useDeploymentGallery } from "./useLandingPageData";
import { useDeploymentGalleryDerivedData } from "./useDeploymentGalleryDerivedData";
import {
  toastError,
  toastSuccess,
} from "../services/admin-service/adminToast";

export function useAdminDeploymentGalleryPage() {
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
    duplicateDeployment,
    bulkUpdateDeploymentStatus,
  } = useDeploymentGallery({
    search,
    status: statusFilter === "all" ? "" : statusFilter,
    category: categoryFilter === "all" ? "" : categoryFilter,
  });

  const { normalized, categories, stats } = useDeploymentGalleryDerivedData({
    deployments,
    allDeployments,
  });

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

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingDeployment(null);
  };

  const handleSingleStatusChange = async (id, status) => {
    try {
      await updateDeployment({ deploymentId: id, status });
      toastSuccess("Updated successfully", "Deployment status updated.");
    } catch (error) {
      toastError(error, "Update failed");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const cloned = await duplicateDeployment(id);
      if (cloned) {
        openEdit(cloned);
        toastSuccess("Duplicated successfully", "Deployment duplicated.");
      }
    } catch (error) {
      toastError(error, "Duplicate failed");
    }
  };

  const handleBulkPublish = async () => {
    if (!selectedIds.length) return;

    try {
      const ids = [...selectedIds];
      await bulkUpdateDeploymentStatus(ids, "published");
      clearSelection();
      toastSuccess("Updated successfully", "Selected deployments published.");
    } catch (error) {
      toastError(error, "Update failed");
    }
  };

  const handleBulkArchive = async () => {
    if (!selectedIds.length) return;

    try {
      const ids = [...selectedIds];
      await bulkUpdateDeploymentStatus(ids, "archived");
      clearSelection();
      toastSuccess("Updated successfully", "Selected deployments archived.");
    } catch (error) {
      toastError(error, "Update failed");
    }
  };

  const handleSubmit = async (input) => {
    try {
      if (editingDeployment?.deploymentId) {
        await updateDeployment(input);
        toastSuccess("Updated successfully", "Deployment updated.");
        return;
      }

      await createDeployment(input);
      toastSuccess("Created successfully", "Deployment created.");
    } catch (error) {
      toastError(error, editingDeployment?.deploymentId ? "Update failed" : "Create failed");
      throw error;
    }
  };

  return {
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
  };
}
