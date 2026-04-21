import { DeploymentGalleryCard } from "./DeploymentGalleryCard";

export function DeploymentGalleryGrid({ items, onEdit, onDuplicate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item) => (
        <DeploymentGalleryCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}

export default DeploymentGalleryGrid;
