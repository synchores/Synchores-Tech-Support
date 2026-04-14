import { useState, useMemo } from "react";
import { useDeploymentGallery } from "../../hooks/useLandingPageData";
import { DeploymentStatsSection } from "../../components/layout/adminLanding-contents/DeploymentStatsSection";
import { DeploymentGridSection } from "../../components/layout/adminLanding-contents/DeploymentGridSection";
import { DeploymentDetailModal } from "../../components/layout/adminLanding-contents/DeploymentDetailModal";

export function AdminDeploymentGallery() {
  const {
    deployments,
    loading,
    createDeployment,
    updateDeployment,
    deleteDeployment,
  } = useDeploymentGallery();
  const [search, setSearch] = useState("");
  const [detailDeployment, setDetailDeployment] = useState(null);
  const [newModal, setNewModal] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return deployments;
    const q = search.toLowerCase();
    return deployments.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }, [deployments, search]);

  const stats = {
    total: deployments.length,
    categories: deployments.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {}),
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Deployment Gallery
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Manage deployment showcases on your landing page
        </p>
      </div>

      {/* Stats */}
      <DeploymentStatsSection stats={stats} />

      {/* Grid Section */}
      <DeploymentGridSection
        deployments={filtered}
        search={search}
        onSearchChange={setSearch}
        onNew={() => setNewModal(true)}
        onEdit={setDetailDeployment}
        onDelete={deleteDeployment}
        isLoading={loading}
      />

      {/* Modal for Create */}
      {newModal && (
        <DeploymentDetailModal
          onClose={() => setNewModal(false)}
          onSubmit={createDeployment}
        />
      )}

      {/* Modal for Edit */}
      {detailDeployment && (
        <DeploymentDetailModal
          deployment={detailDeployment}
          onClose={() => setDetailDeployment(null)}
          onSubmit={updateDeployment}
        />
      )}
    </div>
  );
}

export default AdminDeploymentGallery;
