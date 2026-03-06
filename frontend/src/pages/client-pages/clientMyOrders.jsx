import { useEffect, useMemo, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client/react';
import { colors } from '../../colors';
import { Icons } from '../../components/Icons';
import { useAuth } from '../../context/authContext';
import { CLIENT_INVOICE_BY_ORDER_QUERY, CLIENT_ORDERS_QUERY } from '../../services/client-service/Queries';
import { PAY_INVOICE_BY_ORDER_MUTATION } from '../../services/client-service/Mutation';
import InvoiceDetailsModal from '../../components/modal/InvoiceDetailsModal';

export default function ClientMyOrders() {
  const { user } = useAuth();
  const apolloClient = useApolloClient();
  const [invoiceMap, setInvoiceMap] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [actionFeedback, setActionFeedback] = useState({ orderId: null, message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  const userId = useMemo(() => {
    const candidate = user?.userId ?? user?.id ?? user?.sub;
    const parsed = Number(candidate);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }, [user]);

  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery(CLIENT_ORDERS_QUERY, {
    variables: { userId: userId ?? 0 },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  });

  const orders = useMemo(() => data?.clientOrders ?? [], [data]);

  const [payInvoiceByOrderId, { loading: isPaying }] = useMutation(
    PAY_INVOICE_BY_ORDER_MUTATION,
  );

  useEffect(() => {
    let ignore = false;

    async function loadInvoices() {
      if (orders.length === 0) {
        setInvoiceMap({});
        return;
      }

      const invoiceEntries = await Promise.all(
        orders.map(async (order) => {
          try {
            const response = await apolloClient.query({
              query: CLIENT_INVOICE_BY_ORDER_QUERY,
              variables: { orderId: order.orderId },
              fetchPolicy: 'network-only',
            });
            return [order.orderId, response?.data?.invoiceByOrderId ?? null];
          } catch {
            return [order.orderId, null];
          }
        }),
      );

      if (!ignore) {
        setInvoiceMap(Object.fromEntries(invoiceEntries));
      }
    }

    loadInvoices();

    return () => {
      ignore = true;
    };
  }, [apolloClient, orders]);

  const totalServices = orders.length;
  const totalInvestment = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
  const selectedOrder = orders.find((order) => order.orderId === selectedOrderId) ?? null;
  const selectedInvoice = selectedOrderId ? invoiceMap[selectedOrderId] : null;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const invoice = invoiceMap[order.orderId];
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term.length === 0 ||
        String(order.orderId).includes(term) ||
        String(order.productId).includes(term) ||
        String(invoice?.invoiceNumber || '').toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'ALL' || String(order.status) === statusFilter;

      const paymentStatus = String(invoice?.paymentStatus || 'PENDING').toUpperCase();
      const matchesPayment = paymentFilter === 'ALL' || paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, invoiceMap, searchTerm, statusFilter, paymentFilter]);

  const getStatusStyle = (status) => {
    const statusMap = {
      PENDING_APPROVAL: { bg: 'rgba(100, 116, 139, 0.15)', color: '#94a3b8' },
      APPROVED: { bg: 'rgba(8, 145, 178, 0.15)', color: '#06b6d4' },
      REJECTED: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
      ORDERED_FROM_SUPPLIER: { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' },
      READY_FOR_BILLING: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
      PAID: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
      DELIVERED: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
    };

    return statusMap[status] ?? { bg: 'var(--border, rgba(0, 0, 0, 0.1))', color: '#9ca3af' };
  };

  const openInvoiceModal = (orderId) => {
    setActionFeedback({ orderId: null, message: '' });
    setSelectedOrderId(orderId);
  };

  const closeInvoiceModal = () => {
    setSelectedOrderId(null);
  };

  const refreshInvoiceForOrder = async (orderId) => {
    try {
      const response = await apolloClient.query({
        query: CLIENT_INVOICE_BY_ORDER_QUERY,
        variables: { orderId },
        fetchPolicy: 'network-only',
      });

      setInvoiceMap((prev) => ({
        ...prev,
        [orderId]: response?.data?.invoiceByOrderId ?? null,
      }));
    } catch {
      // Keep current cached invoice if refresh fails.
    }
  };

  const handlePayNow = async (orderId) => {
    setActionFeedback({ orderId: null, message: '' });

    try {
      await payInvoiceByOrderId({ variables: { orderId } });
      await Promise.all([refreshInvoiceForOrder(orderId), refetch()]);
      setActionFeedback({ orderId, message: 'Payment completed successfully.' });
    } catch (mutationError) {
      console.error('Failed to pay invoice:', mutationError);
      setActionFeedback({ orderId, message: 'Payment failed. Please try again.' });
    }
  };

  const handleViewInvoice = () => {
    if (!selectedOrder || !selectedInvoice) {
      return;
    }

    const invoiceWindow = window.open('', '_blank', 'width=980,height=760');
    if (!invoiceWindow) {
      return;
    }

    const dueDate = selectedInvoice.dueDate
      ? new Date(selectedInvoice.dueDate).toLocaleDateString()
      : 'TBD';
    const createdDate = selectedOrder.createdAt
      ? new Date(selectedOrder.createdAt).toLocaleDateString()
      : 'TBD';
    const orderStatus = selectedOrder.status.replaceAll('_', ' ');
    const paymentStatus = String(selectedInvoice.paymentStatus || 'PENDING').toUpperCase();
    const paymentColor = paymentStatus === 'PAID' ? '#16a34a' : '#d97706';

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>${selectedInvoice.invoiceNumber}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              background: #f1f5f9;
              font-family: Arial, sans-serif;
              color: #0f172a;
            }
            .sheet {
              max-width: 860px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid #dbe4ef;
              box-shadow: 0 12px 34px rgba(15, 23, 42, 0.14);
            }
            .header {
              background: linear-gradient(120deg, #0f172a 36%, #0b5ea8 36%, #155fa0 100%);
              color: #ffffff;
              padding: 24px 28px;
              display: flex;
              justify-content: space-between;
              gap: 20px;
            }
            .brand-title {
              margin: 0;
              font-size: 24px;
              font-weight: 800;
              letter-spacing: 0.02em;
            }
            .brand-sub {
              margin: 6px 0 0;
              font-size: 12px;
              color: rgba(191, 219, 254, 0.95);
              letter-spacing: 0.05em;
            }
            .invoice-title {
              margin: 0;
              font-size: 34px;
              line-height: 1;
              font-weight: 900;
              text-align: right;
            }
            .meta {
              margin-top: 8px;
              font-size: 12px;
              line-height: 1.5;
              text-align: right;
            }
            .status-pill {
              display: inline-block;
              margin-top: 10px;
              padding: 4px 10px;
              border-radius: 999px;
              background: rgba(255,255,255,0.14);
              font-size: 11px;
              letter-spacing: 0.06em;
            }
            .content { padding: 22px 28px 28px; }
            .row-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 18px;
              margin-bottom: 18px;
            }
            .card {
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              padding: 14px;
            }
            .label {
              margin: 0 0 6px;
              color: #64748b;
              font-size: 11px;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              font-weight: 700;
            }
            .value { margin: 0; font-size: 14px; line-height: 1.5; }
            .value strong { font-size: 15px; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0 16px;
            }
            thead th {
              text-align: left;
              padding: 10px 12px;
              background: #0b5ea8;
              color: #ffffff;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.04em;
            }
            tbody td {
              border-bottom: 1px solid #e2e8f0;
              padding: 12px;
              font-size: 13px;
              color: #1e293b;
            }
            tfoot td {
              padding: 10px 12px;
              font-size: 13px;
            }
            .totals {
              margin-left: auto;
              width: 320px;
              border: 1px solid #dbe4ef;
              border-radius: 10px;
              overflow: hidden;
            }
            .totals-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 12px;
              border-bottom: 1px solid #e2e8f0;
              font-size: 13px;
            }
            .totals-row:last-child {
              border-bottom: none;
              background: #0b5ea8;
              color: #ffffff;
              font-weight: 800;
            }
            .footer {
              margin-top: 22px;
              padding-top: 14px;
              border-top: 1px solid #e2e8f0;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              gap: 10px;
            }
            .note {
              margin: 0;
              font-size: 12px;
              color: #64748b;
              line-height: 1.6;
              max-width: 530px;
            }
            .signature {
              text-align: right;
              min-width: 170px;
              font-size: 11px;
              color: #64748b;
            }
            .signature-line {
              margin-top: 26px;
              border-top: 1px solid #94a3b8;
              padding-top: 6px;
            }
            .actions {
              margin-top: 18px;
              display: flex;
              justify-content: flex-end;
              gap: 10px;
            }
            .btn {
              border: none;
              border-radius: 8px;
              padding: 10px 14px;
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
            }
            .btn-print { background: #0b5ea8; color: #ffffff; }
            .btn-close { background: #e2e8f0; color: #334155; }
            @media print {
              body { padding: 0; background: #ffffff; }
              .sheet { border: none; box-shadow: none; }
              .actions { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="header">
              <div>
                <h1 class="brand-title">SYNCHORES</h1>
                <p class="brand-sub">IT SOLUTIONS</p>
              </div>
              <div>
                <h2 class="invoice-title">INVOICE</h2>
                <div class="meta">
                  <div><strong>Invoice:</strong> ${selectedInvoice.invoiceNumber}</div>
                  <div><strong>Order:</strong> #${selectedOrder.orderId}</div>
                  <div><strong>Issue Date:</strong> ${createdDate}</div>
                  <div><strong>Due Date:</strong> ${dueDate}</div>
                </div>
                <span class="status-pill" style="color:${paymentColor};">${paymentStatus}</span>
              </div>
            </div>

            <div class="content">
              <div class="row-grid">
                <div class="card">
                  <p class="label">Invoice To</p>
                  <p class="value"><strong>User #${selectedOrder.userId}</strong></p>
                  <p class="value">Order status: ${orderStatus}</p>
                </div>
                <div class="card">
                  <p class="label">Payment Details</p>
                  <p class="value">Method: Portal Payment</p>
                  <p class="value">Reference: ${selectedInvoice.invoiceNumber}</p>
                  <p class="value">Status: ${paymentStatus}</p>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th style="width:12%">No.</th>
                    <th style="width:46%">Description</th>
                    <th style="width:14%">Price</th>
                    <th style="width:12%">Qty</th>
                    <th style="width:16%; text-align:right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>Product #${selectedOrder.productId}</td>
                    <td>$${Number(selectedOrder.unitPrice).toFixed(2)}</td>
                    <td>${selectedOrder.quantity}</td>
                    <td style="text-align:right; font-weight:700;">$${Number(selectedInvoice.totalAmount).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div class="totals">
                <div class="totals-row"><span>Subtotal</span><span>$${Number(selectedInvoice.totalAmount).toFixed(2)}</span></div>
                <div class="totals-row"><span>Discount</span><span>$0.00</span></div>
                <div class="totals-row"><span>Tax (0%)</span><span>$0.00</span></div>
                <div class="totals-row"><span>Total</span><span>$${Number(selectedInvoice.totalAmount).toFixed(2)}</span></div>
              </div>

              <div class="footer">
                <p class="note">
                  Terms and conditions: Payment is due on or before the due date shown above.
                  Services and fulfillment are managed according to Synchores client agreement terms.
                </p>
                <div class="signature">
                  <div class="signature-line">Synchores Billing</div>
                </div>
              </div>

              <div class="actions">
                <button class="btn btn-close" onclick="window.close()">Close</button>
                <button class="btn btn-print" onclick="window.print()">Print / Save PDF</button>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    invoiceWindow.document.close();
    invoiceWindow.focus();
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `var(--background, #ffffff)` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-2 tracking-tight" style={{ color: 'var(--foreground, #111319)' }}>My Orders</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>Track your product orders, invoices, and payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            className="p-6 rounded-xl transition-all duration-300 group"
            style={{
              background: `var(--card, #ffffff)`,
              border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
              boxShadow: '0 8px 20px rgba(3, 2, 19, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(3, 2, 19, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(3, 2, 19, 0.08)';
            }}
          >
            <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>Total Orders</p>
            <p className="text-4xl font-black" style={{ color: 'var(--foreground, #111319)' }}>{totalServices}</p>
          </div>
          <div
            className="p-6 rounded-xl transition-all duration-300 group"
            style={{
              background: `linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.02) 100%)`,
              border: '1px solid rgba(6, 182, 212, 0.15)',
              boxShadow: '0 8px 20px rgba(6, 182, 212, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(6, 182, 212, 0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(6, 182, 212, 0.1)';
            }}
          >
            <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>Total Investment</p>
            <p className="text-4xl font-black" style={{ color: colors.cyan }}>${totalInvestment.toFixed(2)}</p>
          </div>
        </div>

        <div
          className="mb-5 p-3 rounded-xl"
          style={{
            background: 'var(--card, #ffffff)',
            border: '1px solid var(--border, rgba(0,0,0,0.1))',
            boxShadow: '0 6px 16px rgba(3, 2, 19, 0.06)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order #, product #, or invoice #"
              className="orders-filter-input orders-filter-control px-3 py-2 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--background, #ffffff)',
                border: '1px solid var(--border, rgba(0,0,0,0.1))',
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="orders-filter-select orders-filter-control px-3 py-2 pr-10 rounded-lg text-sm outline-none appearance-none"
              style={{
                background: 'var(--background, #ffffff)',
                border: '1px solid var(--border, rgba(0,0,0,0.1))',
              }}
            >
              <option value="ALL">All Order Statuses</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="ORDERED_FROM_SUPPLIER">Ordered From Supplier</option>
              <option value="READY_FOR_BILLING">Ready For Billing</option>
              <option value="PAID">Paid</option>
              <option value="DELIVERED">Delivered</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="orders-filter-select orders-filter-control px-3 py-2 pr-10 rounded-lg text-sm outline-none appearance-none"
              style={{
                background: 'var(--background, #ffffff)',
                border: '1px solid var(--border, rgba(0,0,0,0.1))',
              }}
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="UNPAID">Unpaid</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <p className="mt-2 text-xs" style={{ color: colors.textMuted }}>
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>

        {/* Service Timeline */}
        {loading && (
          <div className="p-6 rounded-xl" style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0, 0, 0, 0.1))' }}>
            <p style={{ color: colors.textSecondary }}>Loading your orders...</p>
          </div>
        )}

        {!loading && error && (
          <div className="p-6 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <p style={{ color: '#fca5a5' }}>Failed to load orders. Please try again.</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="p-6 rounded-xl" style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0, 0, 0, 0.1))' }}>
            <p style={{ color: colors.textSecondary }}>No orders yet. Place an order from the shop to get started.</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && filteredOrders.length === 0 && (
          <div className="p-6 rounded-xl" style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0, 0, 0, 0.1))' }}>
            <p style={{ color: colors.textSecondary }}>No orders match the current filters.</p>
          </div>
        )}

        <div className="space-y-4">
          {!loading && !error && filteredOrders.map((order, index) => {
            const invoice = invoiceMap[order.orderId];
            const statusStyle = getStatusStyle(order.status);
            const canPayNow =
              order.status === 'READY_FOR_BILLING' &&
              String(invoice?.paymentStatus).toUpperCase() === 'UNPAID';

            return (
            <div key={order.orderId} className="relative group">
              {/* Timeline Line */}
              {index !== filteredOrders.length - 1 && (
                <div className="absolute left-5 top-16 w-px h-20" style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)' }} />
              )}

              {/* Service Card */}
              <div
                className="p-4 rounded-xl transition-all duration-300"
                style={{
                  background: `var(--card, #ffffff)`,
                  border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                  boxShadow: '0 4px 14px rgba(3, 2, 19, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(2px)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(6, 182, 212, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(3, 2, 19, 0.08)';
                }}
              >
                <div className="flex gap-4">
                  {/* Timeline Circle */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-full font-bold"
                      style={{
                        backgroundColor: colors.cyan,
                        color: colors.primary
                      }}
                    >
                      <Icons.Check size={16} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-bold text-base" style={{ color: 'var(--foreground, #111319)' }}>Order #{order.orderId}</h3>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: statusStyle.bg, color: statusStyle.color }}
                      >
                        {order.status.replaceAll('_', ' ')}
                      </span>
                    </div>
                    <p style={{ color: colors.textDark }} className="text-sm mb-4">
                      Product #{order.productId} x {order.quantity}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <p className="text-[11px] font-semibold mb-1" style={{ color: colors.textMuted }}>Created</p>
                        <p className="text-sm" style={{ color: 'var(--foreground, #111319)' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold mb-1" style={{ color: colors.textMuted }}>Invoice</p>
                        <p className="text-sm" style={{ color: 'var(--foreground, #111319)' }}>{invoice?.invoiceNumber ?? 'Pending'}</p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold mb-1" style={{ color: colors.textMuted }}>Total</p>
                        <p className="text-sm font-bold" style={{ color: 'var(--foreground, #111319)' }}>${Number(order.totalPrice).toFixed(2)}</p>
                      </div>
                    </div>

                    {invoice && (
                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: colors.textMuted }}>Billing Status</p>
                        <p className="text-sm" style={{ color: invoice.paymentStatus === 'PAID' ? '#22c55e' : '#f59e0b' }}>
                          {invoice.paymentStatus} {invoice.dueDate ? `| Due ${new Date(invoice.dueDate).toLocaleDateString()}` : ''}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => openInvoiceModal(order.orderId)}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold"
                            style={{
                              border: '1px solid rgba(6, 182, 212, 0.3)',
                              color: '#22d3ee',
                              background: 'rgba(6, 182, 212, 0.1)',
                            }}
                          >
                            View Invoice
                          </button>

                          {canPayNow && (
                            <button
                              onClick={() => handlePayNow(order.orderId)}
                              disabled={isPaying}
                              className="px-3 py-1.5 rounded-md text-xs font-semibold"
                              style={{
                                background: '#06b6d4',
                                color: '#ffffff',
                                opacity: isPaying ? 0.7 : 1,
                                cursor: isPaying ? 'not-allowed' : 'pointer',
                              }}
                            >
                              {isPaying ? 'Processing...' : 'Pay Now'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {actionFeedback.message && actionFeedback.orderId === order.orderId && (
                      <p className="mt-3 text-xs" style={{ color: actionFeedback.message.includes('successfully') ? '#22c55e' : '#f87171' }}>
                        {actionFeedback.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>

      {selectedOrder && selectedInvoice && (
        <InvoiceDetailsModal
          order={selectedOrder}
          invoice={selectedInvoice}
          onClose={closeInvoiceModal}
          onPayNow={() => handlePayNow(selectedOrder.orderId)}
          onViewInvoice={handleViewInvoice}
          isPaying={isPaying}
        />
      )}
    </div>
  );
}


