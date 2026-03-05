import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";

export const statusConfig = {
  pending: { bg: "#f8fafc", color: "#94a3b8", label: "Pending", icon: Clock },
  processing: { bg: "#fffbeb", color: "#f59e0b", label: "Processing", icon: Package },
  shipped: { bg: "#eff6ff", color: "#3b82f6", label: "Shipped", icon: Truck },
  delivered: { bg: "#f0fdf4", color: "#22c55e", label: "Delivered", icon: CheckCircle2 },
  cancelled: { bg: "#fef2f2", color: "#ef4444", label: "Cancelled", icon: XCircle },
};
