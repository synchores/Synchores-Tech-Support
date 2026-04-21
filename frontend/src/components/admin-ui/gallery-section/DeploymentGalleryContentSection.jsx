import { CmsDataTable } from "../CmsDataTable";
import { DeploymentGalleryGrid } from "./DeploymentGalleryGrid";

export function DeploymentGalleryContentSection({
  view,
  normalized,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDuplicate,
  onStatusChange,
}) {
  if (view === "table") {
    return (
      <CmsDataTable
        items={normalized}
        itemType="deployments"
        selectedIds={selectedIds}
        onToggleSelect={onToggleSelect}
        onToggleSelectAll={onToggleSelectAll}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onToggleStatus={onStatusChange}
        onStatusChange={onStatusChange}
      />
    );
  }

  return (
    <DeploymentGalleryGrid
      items={normalized}
      onEdit={onEdit}
      onDuplicate={onDuplicate}
    />
  );
}

export default DeploymentGalleryContentSection;
