import {
  Clock3,
  CheckCircle2,
  XCircle,
  Truck,
  Receipt,
  Wallet,
  PackageCheck,
} from "lucide-react";

export const statusConfig = {
  PENDING_APPROVAL: {
    bg: "#f8fafc",
    color: "#64748b",
    label: "Pending Approval",
    icon: Clock3,
  },
  APPROVED: {
    bg: "#ecfeff",
    color: "#0891b2",
    label: "Approved",
    icon: CheckCircle2,
  },
  REJECTED: {
    bg: "#fef2f2",
    color: "#dc2626",
    label: "Rejected",
    icon: XCircle,
  },
  ORDERED_FROM_SUPPLIER: {
    bg: "#eff6ff",
    color: "#2563eb",
    label: "Ordered From Supplier",
    icon: Truck,
  },
  READY_FOR_BILLING: {
    bg: "#fefce8",
    color: "#ca8a04",
    label: "Ready For Billing",
    icon: Receipt,
  },
  PAID: {
    bg: "#f0fdf4",
    color: "#16a34a",
    label: "Paid",
    icon: Wallet,
  },
  DELIVERED: {
    bg: "#ecfdf5",
    color: "#059669",
    label: "Delivered",
    icon: PackageCheck,
  },
};
