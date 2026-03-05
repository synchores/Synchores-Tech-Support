import { useState, useMemo } from "react";
import { tickets as initialTickets } from "../data/mockData";
import NewTicketModal from "../../components/modal/NewTicketModal";
import { AssignModal } from "../../components/layout/adminTickets-contents/AssignModal";
import { TicketsStats } from "../../components/layout/adminTickets-contents/TicketsStats";
import { TicketsToolbar } from "../../components/layout/adminTickets-contents/TicketsToolbar";
import { TicketsTable } from "../../components/layout/adminTickets-contents/TicketsTable";
import { TicketsFooter } from "../../components/layout/adminTickets-contents/TicketsFooter";

export function AdminTickets() {
  const [ticketList, setTicketList] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [assignModal, setAssignModal] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => ticketList.filter(t => {
    const q = search.toLowerCase();
    if (q && !t.id.toLowerCase().includes(q) && !t.title.toLowerCase().includes(q) && !t.customer.toLowerCase().includes(q)) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    return true;
  }), [ticketList, search, statusFilter, priorityFilter, categoryFilter]);

  const stats = useMemo(() => ({
    open: ticketList.filter(t => t.status === "open").length,
    inProgress: ticketList.filter(t => t.status === "in-progress").length,
    resolved: ticketList.filter(t => t.status === "resolved").length,
    critical: ticketList.filter(t => t.priority === "critical").length,
  }), [ticketList]);

  function handleAssign(ticketId, agentName) {
    setTicketList(prev => prev.map(t => t.id === ticketId ? { ...t, assignedAgent: agentName, status: "in-progress" } : t));
  }

  function handleStatusChange(id, status) {
    setTicketList(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  }

  function handleNew(data) {
    const newTicket = {
      id: `TKT-${String(ticketList.length + 1).padStart(3, "0")}`,
      title: data.title || "",
      description: data.description || "",
      customer: data.customer || "",
      customerEmail: "",
      assignedAgent: null,
      status: "open",
      priority: data.priority || "medium",
      category: data.category || "network",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTicketList(prev => [newTicket, ...prev]);
  }

  function handleSelectAll(isChecked) {
    setSelected(isChecked ? filtered.map(t => t.id) : []);
  }

  function handleSelectRow(ticketId, isChecked) {
    setSelected(prev => 
      isChecked ? [...prev, ticketId] : prev.filter(id => id !== ticketId)
    );
  }

  function handleMarkResolved() {
    selected.forEach(id => handleStatusChange(id, "resolved"));
    setSelected([]);
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <TicketsStats stats={stats} />

      <div className="rounded-xl overflow-hidden" style={{ background: "white", border: "1px solid #e2e8f0" }}>
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
