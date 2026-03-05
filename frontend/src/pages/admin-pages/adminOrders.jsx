import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { OrderStatsSection } from "../../components/layout/adminOrders-Contents/OrderStatsSection";
import { OrdersTableSection } from "../../components/layout/adminOrders-Contents/OrdersTableSection";
import { OrderDetailModal } from "../../components/layout/adminOrders-Contents/OrderDetailModal";
import { ALL_ORDERS_QUERY } from "../../services/admin-service/Queries";
import { TRANSITION_ORDER_STATUS_MUTATION } from "../../services/admin-service/Mutation";

const validTransitions = {
  PENDING_APPROVAL: ["APPROVED", "REJECTED"],
  APPROVED: ["ORDERED_FROM_SUPPLIER"],
  REJECTED: [],
  ORDERED_FROM_SUPPLIER: ["READY_FOR_BILLING"],
  READY_FOR_BILLING: ["PAID"],
  PAID: ["DELIVERED"],
  DELIVERED: [],
};

export function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailOrder, setDetailOrder] = useState(null);

  const { data, loading, error } = useQuery(ALL_ORDERS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const [transitionOrderStatus, { loading: transitionLoading }] = useMutation(
    TRANSITION_ORDER_STATUS_MUTATION,
    {
      refetchQueries: [{ query: ALL_ORDERS_QUERY }],
      awaitRefetchQueries: true,
    },
  );

  const orderList = useMemo(() => data?.allOrders ?? [], [data]);

  const filtered = useMemo(() => orderList.filter((o) => {
    const q = search.toLowerCase();
    const matchesOrderId = `#${o.orderId}`.toLowerCase().includes(q);
    const matchesUserId = `user #${o.userId}`.toLowerCase().includes(q);
    const matchesProductId = `product #${o.productId}`.toLowerCase().includes(q);

    if (q && !matchesOrderId && !matchesUserId && !matchesProductId) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return true;
  }), [orderList, search, statusFilter]);

  const totalRevenue = useMemo(
    () => orderList.reduce((acc, o) => acc + Number(o.totalPrice || 0), 0),
    [orderList],
  );

  async function handleStatusChange(orderId, nextStatus) {
    try {
      const result = await transitionOrderStatus({
        variables: { input: { orderId, nextStatus } },
      });

      const updated = result?.data?.transitionOrderStatus;
      if (updated && detailOrder?.orderId === orderId) {
        setDetailOrder((prev) =>
          prev
            ? {
                ...prev,
                status: updated.status,
                updatedAt: updated.updatedAt,
              }
            : null,
        );
      }
    } catch (mutationError) {
      console.error("Failed to transition order status:", mutationError);
    }
  }

  const allowedTransitions = validTransitions[detailOrder?.status] ?? [];

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
        isLoading={loading}
        error={error}
      />
      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          onStatusChange={handleStatusChange}
          allowedTransitions={allowedTransitions}
          transitionLoading={transitionLoading}
        />
      )}
    </div>
  );
}

export default AdminOrders;