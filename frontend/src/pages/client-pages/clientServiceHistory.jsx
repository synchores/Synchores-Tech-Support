import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { colors } from '../../colors';
import { Icons } from '../../components/Icons';
import { CLIENTS_SERVICE } from '../../services/client-service/Queries';

export default function ClientServiceHistory() {
  const { data, loading, error } = useQuery(CLIENTS_SERVICE, {
    fetchPolicy: 'cache-and-network',
  });

  const services = useMemo(() => data?.getMyServices ?? [], [data]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        services
          .map((service) => service?.category)
          .filter((category) => typeof category === 'string' && category.trim().length > 0),
      ),
    );
  }, [services]);

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{ background: `var(--background, #ffffff)` }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Service History</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>
            Review services that you have requested and completed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            className="p-8 rounded-xl"
            style={{
              background: 'var(--card, #ffffff)',
              border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>
              Total Services
            </p>
            <p className="text-4xl font-black text-white">{services.length}</p>
          </div>

          <div
            className="p-8 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.02) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            }}
          >
            <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>
              Service Categories
            </p>
            <p className="text-4xl font-black" style={{ color: colors.cyan }}>
              {categories.length}
            </p>
          </div>
        </div>

        {loading && (
          <div
            className="p-6 rounded-xl"
            style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0, 0, 0, 0.1))' }}
          >
            <p style={{ color: colors.textSecondary }}>Loading service history...</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="p-6 rounded-xl"
            style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          >
            <p style={{ color: '#fca5a5' }}>Failed to load service history. Please try again.</p>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div
            className="p-6 rounded-xl"
            style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0, 0, 0, 0.1))' }}
          >
            <p style={{ color: colors.textSecondary }}>No services found yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {!loading &&
            !error &&
            services.map((service) => (
              <article
                key={service.serviceId}
                className="rounded-xl p-5 transition-all duration-300"
                style={{
                  background: 'var(--card, #ffffff)',
                  border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-white font-bold text-lg leading-tight">{service.serviceName}</h2>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(6, 182, 212, 0.15)', color: colors.cyan }}
                  >
                    {service.category || 'General'}
                  </span>
                </div>

                <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                  {service.description || 'No description provided.'}
                </p>

                <div className="pt-3" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
                  <div className="flex items-center gap-2" style={{ color: colors.textMuted }}>
                    <Icons.Check size={14} />
                    <span className="text-xs">Service ID: {service.serviceId}</span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
}


