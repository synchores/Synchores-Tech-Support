import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_TICKETS_QUERY } from "../../services/admin-service/Queries";
import { UPDATE_TICKET_STATUS_MUTATION } from "../../services/admin-service/Mutation";
import { tickets as mockTickets } from "../data/mockData";
import NewTicketModal from "../../components/modal/NewTicketModal";
import { AssignModal } from "../../components/layout/adminTickets-contents/AssignModal";
import { TicketsStats } from "../../components/layout/adminTickets-contents/TicketsStats";
import { TicketsToolbar } from "../../components/layout/adminTickets-contents/TicketsToolbar";
import { TicketsTable } from "../../components/layout/adminTickets-contents/TicketsTable";
import { TicketsFooter } from "../../components/layout/adminTickets-contents/TicketsFooter";
import { toastError, toastSuccess } from "../../services/admin-service/adminToast";

export function AdminTickets() {
  const { data: ticketsData, loading, error } = useQuery(GET_ALL_TICKETS_QUERY);
  const [updateTicketStatus] = useMutation(UPDATE_TICKET_STATUS_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TICKETS_QUERY }],
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [assignModal, setAssignModal] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [localTickets, setLocalTickets] = useState(mockTickets);

  // Map backend tickets to frontend format, fallback to mock data
  const ticketList = useMemo(() => {
    // If we got data from the backend, use it
    if (ticketsData?.getAllTickets) {
      return ticketsData.getAllTickets.map(ticket => ({
        id: `TKT-${String(ticket.ticketId).padStart(3, "0")}`,
        title: ticket.title,
        description: ticket.description,
        customer: "Client",
        customerEmail: "",
        assignedAgent: null,
        status: ticket.status,
        priority: ticket.priority,
        category: "general",
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        ticketId: ticket.ticketId,
        serviceId: ticket.serviceId,
        userId: ticket.userId,
      }));
    }
    // Fallback: use local state (which starts with mock data)
    return localTickets;
  }, [ticketsData, localTickets]);

  const filtered = useMemo(() => ticketList.filter(t => {
    const q = search.toLowerCase();
    if (q && !t.id.toLowerCase().includes(q) && !t.title.toLowerCase().includes(q) && !t.customer.toLowerCase().includes(q)) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    return true;
  }), [ticketList, search, statusFilter, priorityFilter, categoryFilter]);

  const stats = useMemo(() => ({
    open: ticketList.filter(t => t.status === "pending").length,
    inProgress: ticketList.filter(t => t.status === "in_progress").length,
    resolved: ticketList.filter(t => t.status === "completed").length,
    critical: ticketList.filter(t => t.priority === "critical").length,
  }), [ticketList]);

  async function handleStatusChange(id, newStatus, options = {}) {
    const { silent = false } = options;

    // Update local state optimistically
    setLocalTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    // Try to update via backend
    const ticket = ticketList.find(t => t.id === id);
    if (ticket?.ticketId) {
      try {
        await updateTicketStatus({
          variables: {
            input: {
              ticketId: ticket.ticketId,
              status: newStatus,
            },
          },
        });

        if (!silent) {
          toastSuccess("Updated successfully", "Ticket status updated.");
        }
      } catch (err) {
        console.error("Failed to update ticket status:", err);
        if (!silent) {
          toastError(err, "Update failed");
        }
        // Local state was already updated optimistically, so the UI will reflect the change
      }
      return;
    }

    if (!silent) {
      toastSuccess("Updated successfully", "Ticket status updated.");
    }
  }

  function handleAssign(ticketId, agentName) {
    // TODO: implement assignment if backend supports it
    const ticket = ticketList.find(t => t.id === ticketId);
    if (ticket) {
      handleStatusChange(ticketId, "in_progress");
    }
  }

  function handleNew(data) {
    const newTicket = {
      id: `TKT-${String(localTickets.length + 1).padStart(3, "0")}`,
      title: data.title || "",
      description: data.description || "",
      customer: data.customer || "Client",
      customerEmail: "",
      assignedAgent: null,
      status: "pending",
      priority: data.priority || "medium",
      category: data.category || "general",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLocalTickets(prev => [newTicket, ...prev]);
    toastSuccess("Created successfully", "Ticket created.");
    setNewModal(false);
  }

  function handleSelectAll(isChecked) {
    setSelected(isChecked ? filtered.map(t => t.id) : []);
  }

  function handleSelectRow(ticketId, isChecked) {
    setSelected(prev => 
      isChecked ? [...prev, ticketId] : prev.filter(id => id !== ticketId)
    );
  }

  async function handleMarkResolved() {
    const ids = [...selected];
    await Promise.all(ids.map((id) => handleStatusChange(id, "completed", { silent: true })));
    toastSuccess("Updated successfully", "Selected tickets marked as resolved.");
    setSelected([]);
  }

  if (error && !localTickets.length) {
    return (
      <div className="p-6 flex flex-col gap-5">
        <div className="rounded-lg p-4 bg-yellow-50 border border-yellow-200">
          <p className="text-yellow-800 font-semibold">⚠️ Backend Not Ready</p>
          <p className="text-yellow-700 text-sm">The GraphQL query is not yet available. Please restart your backend server.</p>
          <p className="text-yellow-700 text-sm mt-2">Using mock data for now. Real data will load after restart.</p>
        </div>
        <TicketsStats stats={useMemo(() => ({
          open: localTickets.filter(t => t.status === "pending").length,
          inProgress: localTickets.filter(t => t.status === "in_progress").length,
          resolved: localTickets.filter(t => t.status === "completed").length,
          critical: localTickets.filter(t => t.priority === "critical").length,
        }), [localTickets])} />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <TicketsStats stats={stats} />

			<div className="admin-surface-card overflow-hidden">
        <TicketsToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          onNewClick={() => setNewModal(true)}
        />

        <TicketsTable
          filtered={filtered}
          selected={selected}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          ticketList={ticketList}
          onStatusChange={handleStatusChange}
          onAssignClick={setAssignModal}
        />

        <TicketsFooter
          filtered={filtered}
          ticketList={ticketList}
          selected={selected}
          onMarkResolved={handleMarkResolved}
          onClearSelection={() => setSelected([])}
        />
      </div>

      {assignModal && (
        <AssignModal 
          ticket={assignModal} 
          onClose={() => setAssignModal(null)} 
          onAssign={(name) => handleAssign(assignModal.id, name)} 
        />
      )}
      {newModal && (
        <NewTicketModal 
          onClose={() => setNewModal(false)} 
          onSubmit={handleNew} 
        />
      )}
    </div>
  );
}

export default AdminTickets;
