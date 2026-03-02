import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { colors } from '../../colors';
import { Icons } from '../../components/Icons';
import AddTicketModal from '../../components/modal/AddTicketModal';
import { CLIENTS_TICKETS } from '../../services/client-service/Queries';
import TicketDetailsCard from '../../components/modal/TicketDetailsCard';

export default function ClientTickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [recentlyCreatedTicketId, setRecentlyCreatedTicketId] = useState(null);
  const highlightTimeoutRef = useRef(null);
  const { data, loading, error } = useQuery(CLIENTS_TICKETS);

  const formatDisplayDate = (value) => {
    if (!value) return '';
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    return parsedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const fetchedTickets = (data?.getMyTickets || []).map((ticket) => ({
    id: ticket.ticketId,
    title: ticket.title,
    status: ticket.status === 'pending' ? 'Pending' : ticket.status === 'completed' ? 'Completed' : 'In Progress',
    date: ticket.deadline ? formatDisplayDate(ticket.deadline) : '',
    priority: ticket.priority,
    description: ticket.description,
    attachments: ticket.attachments,
    serviceId: ticket.serviceId,
    deadline: ticket.deadline ? formatDisplayDate(ticket.deadline) : '',
  }));

  const displayTickets = fetchedTickets;

  const filteredTickets = displayTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const handleAddTicket = (createdTicket) => {
    setIsTicketModalOpen(false);

    const createdTicketId = createdTicket?.ticketId ?? createdTicket?.id ?? null;
    if (!createdTicketId) {
      return;
    }

    setRecentlyCreatedTicketId(createdTicketId);

    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = setTimeout(() => {
      setRecentlyCreatedTicketId(null);
      highlightTimeoutRef.current = null;
    }, 3000);
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: colors.success, border: 'rgba(16, 185, 129, 0.3)' };
      case 'Pending':
        return { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' };
      case 'Completed':
        return { bg: `rgba(6, 182, 212, 0.08)`, text: colors.cyanMuted, border: 'rgba(6, 182, 212, 0.2)' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', text: colors.textMuted, border: 'rgba(107, 114, 128, 0.2)' };
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 pb-16 text-center text-white">Loading tickets...</div>;
  }

  if (error) {
    return <div className="min-h-screen pt-24 pb-16 text-center text-red-400">Failed to load your tickets.</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${colors.blue900} 0%, ${colors.blue800} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Tickets</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>Manage and track your support requests</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-lg text-white text-sm outline-none transition-all duration-300"
                style={{
                  background: 'rgba(20, 40, 70, 0.4)',
                  border: '1px solid rgba(107, 114, 128, 0.15)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23999%22%3E%3Cpath d=%22M10 18a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35%22 stroke=%22%23999%22 stroke-width=%222%22 fill=%22none%22/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '12px 50%',
                  backgroundSize: '18px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(107, 114, 128, 0.15)';
                  e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                }}
              />
            </div>

            {/* New Ticket Button */}
            <button 
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              style={{ 
                backgroundColor: colors.cyan,
                color: colors.primary,
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.22)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 16px 40px rgba(6, 182, 212, 0.32)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.22)';
              }}
              onClick={() => setIsTicketModalOpen(true)}
            >
              <Icons.Plus size={19} color={colors.primary} />
              <span className="text-sm">New Ticket</span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All', 'In Progress', 'Pending', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className="px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-300 text-sm font-semibold"
                style={{
                  backgroundColor: filterStatus === status 
                    ? colors.cyan 
                    : 'rgba(20, 40, 70, 0.4)',
                  color: filterStatus === status ? colors.primary : colors.textSecondary,
                  border: `1px solid ${filterStatus === status ? colors.cyan : 'rgba(107, 114, 128, 0.15)'}`,
                  boxShadow: filterStatus === status 
                    ? '0 8px 24px rgba(6, 182, 212, 0.15)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => {
              const statusColors = getStatusColor(ticket.status);
              const isNewlyCreated = recentlyCreatedTicketId === ticket.id;

              return (
                <div 
                  key={ticket.id}
                  className="group p-5 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: `rgba(20, 40, 70, 0.35)`,
                    border: isNewlyCreated ? `1px solid ${colors.cyan}` : '1px solid rgba(107, 114, 128, 0.15)',
                    boxShadow: isNewlyCreated
                      ? '0 0 0 1px rgba(6, 182, 212, 0.5), 0 12px 34px rgba(6, 182, 212, 0.24)'
                      : '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.15)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onClick={() => openTicketDetails(ticket)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openTicketDetails(ticket);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm mb-1.5 truncate">{ticket.title}</h3>
                      <p className="text-xs" style={{ color: colors.textDark }}>Created: {ticket.date}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold border transition-colors"
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          borderColor: statusColors.border
                        }}
                      >
                        {ticket.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        ticket.priority === 'High' 
                          ? 'bg-red-900/20 text-red-400 border-red-500/20'
                          : ticket.priority === 'Medium'
                          ? 'bg-orange-900/20 text-orange-400 border-orange-500/20'
                          : 'bg-blue-900/20 text-blue-400 border-blue-500/20'
                      }`}>
                        {ticket.priority}
                      </span>
                      <Icons.ArrowRight size={16} color={colors.textMuted} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <p style={{ color: colors.textMuted }} className="text-lg">No tickets found</p>
            </div>
          )}
        </div>
      </div>
      {/* Add Ticket Modal */}
      <AddTicketModal 
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)}
        onSubmit={handleAddTicket}
      />
      <TicketDetailsCard
        ticket={selectedTicket}
        isOpen={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
