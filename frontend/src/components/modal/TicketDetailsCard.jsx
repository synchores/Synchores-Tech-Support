import { useEffect } from 'react';
import { colors } from '../../colors';
import { Icons } from '../Icons';

export default function TicketDetailsCard({ ticket, isOpen, onClose }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'In Progress':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: colors.success, border: 'rgba(16, 185, 129, 0.3)' };
      case 'Pending':
        return { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' };
      case 'Completed':
        return { bg: 'rgba(6, 182, 212, 0.08)', text: colors.cyanMuted, border: 'rgba(6, 182, 212, 0.2)' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', text: colors.textMuted, border: 'rgba(107, 114, 128, 0.2)' };
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return { bg: 'rgba(127, 29, 29, 0.35)', text: '#f87171', border: 'rgba(239, 68, 68, 0.35)' };
      case 'Medium':
        return { bg: 'rgba(124, 45, 18, 0.35)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.35)' };
      case 'Low':
        return { bg: 'rgba(30, 58, 138, 0.35)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.35)' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', text: colors.textMuted, border: 'rgba(107, 114, 128, 0.2)' };
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const formatDisplayDate = (value) => {
    if (!value) return 'Not set';
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

  if (!isOpen || !ticket) return null;

  const statusStyles = getStatusStyles(ticket.status);
  const priorityStyles = getPriorityStyles(ticket.priority);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl p-6"
        style={{
          background: `var(--card, #ffffff)`,
          border: '1px solid rgba(76, 108, 170, 0.25)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
              Ticket Details
            </p>
            <h3 className="text-xl font-bold mt-1" style={{ color: colors.textPrimary }}>
              {ticket.title || 'Untitled ticket'}
            </h3>
          </div>
          <button
            type="button"
            className="p-2 rounded-lg transition-all hover:bg-gray-700/40"
            style={{ color: colors.textMuted }}
            onClick={onClose}
            aria-label="Close ticket details"
          >
            <Icons.Close size={20} color={colors.textMuted} />
          </button>
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
            Description
          </p>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: colors.textSecondary }}>
            {ticket.description || 'No additional description provided.'}
          </p>
        </div>

        {ticket.attachments && (
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
              Attachment
            </p>
            <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(76, 108, 170, 0.25)' }}>
              <img src={ticket.attachments} alt="Ticket attachment" className="w-full h-auto max-h-96 object-contain" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <p style={{ color: colors.textMuted }}>Service</p>
            <p className="font-semibold mt-1" style={{ color: colors.textPrimary }}>
              {ticket.serviceId ? `Service #${ticket.serviceId}` : 'Not specified'}
            </p>
          </div>
          <div>
            <p style={{ color: colors.textMuted }}>Status</p>
            <span
              className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: statusStyles.bg,
                color: statusStyles.text,
                borderColor: statusStyles.border,
              }}
            >
              {ticket.status || 'Not specified'}
            </span>
          </div>
          <div>
            <p style={{ color: colors.textMuted }}>Priority</p>
            <span
              className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: priorityStyles.bg,
                color: priorityStyles.text,
                borderColor: priorityStyles.border,
              }}
            >
              {ticket.priority || 'Not specified'}
            </span>
          </div>
          <div>
            <p style={{ color: colors.textMuted }}>Deadline</p>
            <p className="font-semibold mt-1" style={{ color: colors.textPrimary }}>
              {formatDisplayDate(ticket.deadline || ticket.date)}
            </p>
          </div>
          <div>
            <p style={{ color: colors.textMuted }}>Created</p>
            <p className="font-semibold mt-1" style={{ color: colors.textPrimary }}>
              {formatDisplayDate(ticket.date || 'Not available')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


