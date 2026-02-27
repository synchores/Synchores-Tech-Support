import { useState } from 'react';
import { colors } from '../colors';
import { Icons } from '../components/Icons';
import AddTicketModal from '../components/AddTicketModal';
import RequestServiceModal from '../components/RequestServiceModal';
import { SERVICE_TYPES } from '../serviceConfig';

export default function ClientDashboard() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  // For demo, we'll assume the client's primary service type is Web Development
  // In a real app, this would come from user profile/API
  const clientPrimaryServiceType = SERVICE_TYPES.WEB_DEVELOPMENT;

  const [recentTickets, setRecentTickets] = useState([
    { id: 1, title: 'Website Redesign - Phase 1', status: 'In Progress', date: '2026-02-25', priority: 'High' },
    { id: 2, title: 'Server Maintenance', status: 'Pending', date: '2026-02-24', priority: 'Medium' },
    { id: 3, title: 'Database Optimization', status: 'In Progress', date: '2026-02-23', priority: 'High' },
  ]);

  const serviceHistory = [
    { id: 1, name: 'Web Development', completedDate: '2026-02-10', status: 'Completed' },
    { id: 2, name: 'UI/UX Design', completedDate: '2026-01-28', status: 'Completed' },
    { id: 3, name: 'SEO Optimization', completedDate: '2026-01-15', status: 'Completed' },
  ];

  const serviceSummary = [
    { label: 'Active Services', value: '3', icon: '▸' },
    { label: 'Completed', value: '12', icon: '✓' },
    { label: 'Pending', value: '2', icon: '⧗' },
    { label: 'Total Invested', value: '$45K', icon: '💰', highlight: true },
  ];

  const handleAddTicket = (formData) => {
    const newTicket = {
      id: recentTickets.length + 1,
      title: formData.title,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      priority: formData.priority,
    };
    setRecentTickets([newTicket, ...recentTickets]);
    setIsTicketModalOpen(false);
  };

  const handleServiceRequest = (formData) => {
    console.log('Service Request Submitted:', formData);
    // In a real app, this would send data to backend
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

  return (
    <>
      <div className="min-h-screen pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${colors.blue900} 0%, ${colors.blue800} 100%)` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-lg" style={{ color: colors.textMuted }}>Manage your services and track your projects</p>
          </div>

          {/* Service Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceSummary.map((stat, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  background: stat.highlight 
                    ? `linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.03) 100%)`
                    : `rgba(20, 40, 70, 0.4)`,
                  border: `1px solid ${stat.highlight ? 'rgba(6, 182, 212, 0.2)' : 'rgba(107, 114, 128, 0.15)'}`,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)';
                }}
              >
                <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>
                  {stat.label}
                </p>
                <p className="text-4xl font-black" style={{ color: stat.highlight ? colors.cyan : '#f3f4f6' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Tickets Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Recent Tickets</h2>
                <p className="text-sm mt-1" style={{ color: colors.textDark }}>Active and pending support requests</p>
              </div>
              <button 
                onClick={() => setIsTicketModalOpen(true)}
                className="px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2.5 group"
                style={{ 
                  backgroundColor: colors.cyan,
                  color: colors.primary,
                  boxShadow: '0 10px 30px rgba(6, 182, 212, 0.22)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(6, 182, 212, 0.32)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.22)';
                }}
              >
                <Icons.Plus size={19} color={colors.primary} />
                <span className="text-sm">New Ticket</span>
              </button>
            </div>

            <div className="space-y-3">
              {recentTickets.map((ticket, idx) => {
                const statusColors = getStatusColor(ticket.status);
                return (
                  <div 
                    key={ticket.id}
                    className="group p-5 rounded-xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: `rgba(20, 40, 70, 0.35)`,
                      border: '1px solid rgba(107, 114, 128, 0.15)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
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
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm mb-1.5 truncate">{ticket.title}</h3>
                        <p className="text-xs" style={{ color: colors.textDark }}>{ticket.date}</p>
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service History Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-black text-white tracking-tight mb-8">Recent Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceHistory.map(service => (
                <div 
                  key={service.id}
                  className="group relative p-6 rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.02) 100%)`,
                    border: '1px solid rgba(6, 182, 212, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)';
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center font-bold" style={{ color: colors.cyan }}>
                      <Icons.Check size={16} />
                    </div>
                    <h3 className="text-white font-bold text-sm">{service.name}</h3>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textDark }}>Completed</p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{service.completedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              className="p-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
              onClick={() => setIsServiceModalOpen(true)}
              style={{ 
                background: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.cyanMuted} 100%)`,
                color: colors.primary,
                boxShadow: '0 15px 40px rgba(6, 182, 212, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 25px 50px rgba(6, 182, 212, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.25)';
              }}
            >
              <Icons.Plus size={22} color={colors.primary} />
              Request New Service
            </button>
            <button 
              className="p-6 rounded-xl font-bold text-lg transition-all duration-300 border-2 flex items-center justify-center gap-3"
              style={{ 
                borderColor: colors.cyanMuted,
                color: colors.cyan,
                backgroundColor: 'rgba(6, 182, 212, 0.04)',
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.04)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.08)';
              }}
            >
              <Icons.Question size={22} />
              View FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTicketModal 
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)}
        onSubmit={handleAddTicket}
      />
      <RequestServiceModal 
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        clientServiceType={clientPrimaryServiceType}
        onSubmit={handleServiceRequest}
      />
    </>
  );
}
