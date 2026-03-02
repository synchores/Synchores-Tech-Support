import { colors } from '../../colors';

export default function TicketDetailsCard({ ticket }) {
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

  return (
    <div
      className="mt-4 rounded-lg p-4"
      style={{
        background: 'rgba(8, 17, 29, 0.55)',
        border: '1px solid rgba(76, 108, 170, 0.18)',
      }}
    >
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textMuted }}>
          Description
        </p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: colors.textSecondary }}>
          {ticket.description || 'No additional description provided.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <p style={{ color: colors.textMuted }}>Service</p>
          <p className="font-semibold mt-1" style={{ color: colors.textPrimary }}>
            {ticket.serviceId ? `Service #${ticket.serviceId}` : 'Not specified'}
          </p>
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
  );
}
