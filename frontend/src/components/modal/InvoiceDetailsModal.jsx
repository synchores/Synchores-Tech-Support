import { X, FileText, CreditCard } from 'lucide-react';

export default function InvoiceDetailsModal({
  order,
  invoice,
  onClose,
  onPayNow,
  onViewInvoice,
  isPaying,
}) {
  if (!order || !invoice) {
    return null;
  }

  const canPayNow =
    order.status === 'READY_FOR_BILLING' &&
    String(invoice.paymentStatus).toUpperCase() === 'UNPAID';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2, 6, 23, 0.75)' }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{ background: '#0b1627', border: '1px solid rgba(6, 182, 212, 0.25)' }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Invoice Details
            </p>
            <h3 className="text-white" style={{ fontWeight: 700, fontSize: '1.2rem' }}>
              {invoice.invoiceNumber}
            </h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-800 transition-colors">
            <X size={16} color="#94a3b8" />
          </button>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-4" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
          <InfoCard label="Order" value={`#${order.orderId}`} />
          <InfoCard label="Client" value={`User #${order.userId}`} />
          <InfoCard label="Total Amount" value={`$${Number(invoice.totalAmount).toFixed(2)}`} />
          <InfoCard label="Due Date" value={invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'TBD'} />
          <InfoCard label="Payment Status" value={invoice.paymentStatus} />
          <InfoCard label="Order Status" value={order.status.replaceAll('_', ' ')} />
        </div>

        <div className="p-6 flex flex-wrap items-center gap-3 justify-end">
          <button
            onClick={onViewInvoice}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ border: '1px solid rgba(148, 163, 184, 0.35)', color: '#cbd5e1' }}
          >
            <FileText size={14} /> View Invoice
          </button>

          {canPayNow && (
            <button
              onClick={onPayNow}
              disabled={isPaying}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                background: '#06b6d4',
                color: '#ffffff',
                opacity: isPaying ? 0.7 : 1,
                cursor: isPaying ? 'not-allowed' : 'pointer',
              }}
            >
              <CreditCard size={14} />
              {isPaying ? 'Processing...' : 'Pay Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
      <p style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </p>
      <p className="text-white mt-1" style={{ fontWeight: 600 }}>
        {value}
      </p>
    </div>
  );
}
