import { useMemo } from "react";

const STATUS_ORDER = ["published", "draft", "archived"];

export function useDeploymentGalleryDerivedData({ deployments, allDeployments }) {
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
    return Array.from(
      new Set((allDeployments || []).map((item) => item.category))
    ).sort();
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

  return {
    normalized,
    categories,
    stats,
  };
}
