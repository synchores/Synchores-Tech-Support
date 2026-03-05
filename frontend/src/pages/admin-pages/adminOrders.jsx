import { useState, useMemo } from "react";
import { orders as initialOrders } from "../data/mockData";
import { OrderStatsSection } from "../../components/layout/adminOrders-Contents/OrderStatsSection";
import { OrdersTableSection } from "../../components/layout/adminOrders-Contents/OrdersTableSection";
import { OrderDetailModal } from "../../components/layout/adminOrders-Contents/OrderDetailModal";

export function AdminOrders() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailOrder, setDetailOrder] = useState(null);

  const filtered = useMemo(() => orderList.filter(o => {
    const q = search.toLowerCase();
    if (q && !o.id.toLowerCase().includes(q) && !o.customer.toLowerCase().includes(q)) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return true;
  }), [orderList, search, statusFilter]);

  const totalRevenue = orderList.filter(o => o.status !== "cancelled").reduce((acc, o) => acc + o.total, 0);
  const pendingCount = orderList.filter(o => o.status === "pending" || o.status === "processing").length;

  function handleStatusChange(id, status) {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    if (detailOrder?.id === id) setDetailOrder(prev => prev ? { ...prev, status } : null);
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <OrderStatsSection orderList={orderList} />
      <OrdersTableSection
        filtered={filtered}
        orderList={orderList}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setDetailOrder={setDetailOrder}
        totalRevenue={totalRevenue}
      />
      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default AdminOrders;