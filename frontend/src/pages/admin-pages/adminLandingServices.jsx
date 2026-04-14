import { useState, useMemo } from "react";
import { useLandingServices } from "../../hooks/useLandingPageData";
import { ServiceStatsSection } from "../../components/layout/adminLanding-contents/ServiceStatsSection";
import { ServiceGridSection } from "../../components/layout/adminLanding-contents/ServiceGridSection";
import { ServiceDetailModal } from "../../components/layout/adminLanding-contents/ServiceDetailModal";

export function AdminLandingServices() {
  const { services, loading, createService, updateService, deleteService } =
    useLandingServices();
  const [search, setSearch] = useState("");
  const [detailService, setDetailService] = useState(null);
  const [newModal, setNewModal] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return services;
    const q = search.toLowerCase();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [services, search]);

  const stats = {
    total: services.length,
    lastUpdated: services.length > 0 ? services[0].updatedAt : null,
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Service Cards
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Manage services displayed on the landing page
        </p>
      </div>

      {/* Stats */}
      <ServiceStatsSection stats={stats} />

      {/* Grid Section */}
      <ServiceGridSection
        services={filtered}
        search={search}
        onSearchChange={setSearch}
        onNew={() => setNewModal(true)}
        onEdit={setDetailService}
        onDelete={deleteService}
        isLoading={loading}
      />

      {/* Modal for Create */}
      {newModal && (
        <ServiceDetailModal
          onClose={() => setNewModal(false)}
          onSubmit={createService}
        />
      )}

      {/* Modal for Edit */}
      {detailService && (
        <ServiceDetailModal
          service={detailService}
          onClose={() => setDetailService(null)}
          onSubmit={updateService}
        />
      )}
    </div>
  );
}

export default AdminLandingServices;

