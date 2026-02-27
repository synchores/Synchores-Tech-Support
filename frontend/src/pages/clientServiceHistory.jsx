import { useState } from 'react';
import { colors } from '../colors';
import { Icons } from '../components/Icons';

export default function ClientServiceHistory() {
  const serviceHistory = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Full website redesign and development',
      completedDate: '2026-02-10',
      duration: '4 weeks',
      investment: '$12,000',
    },
    {
      id: 2,
      name: 'UI/UX Design',
      description: 'Mobile app interface design',
      completedDate: '2026-01-28',
      duration: '3 weeks',
      investment: '$8,500',
    },
    {
      id: 3,
      name: 'SEO Optimization',
      description: 'Search engine optimization & content strategy',
      completedDate: '2026-01-15',
      duration: '2 weeks',
      investment: '$5,000',
    },
    {
      id: 4,
      name: 'Security Audit',
      description: 'Comprehensive security assessment',
      completedDate: '2025-12-28',
      duration: '1 week',
      investment: '$4,500',
    },
    {
      id: 5,
      name: 'Database Migration',
      description: 'Database upgrade and migration',
      completedDate: '2025-12-10',
      duration: '2 weeks',
      investment: '$7,000',
    },
    {
      id: 6,
      name: 'Email Marketing Setup',
      description: 'Email campaign infrastructure setup',
      completedDate: '2025-11-25',
      duration: '1 week',
      investment: '$3,000',
    },
  ];

  const totalInvestment = '$45,000';
  const totalServices = serviceHistory.length;

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${colors.blue900} 0%, ${colors.blue800} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Service History</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>View all completed services and projects</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            className="p-8 rounded-xl transition-all duration-300 group"
            style={{
              background: `rgba(20, 40, 70, 0.4)`,
              border: '1px solid rgba(107, 114, 128, 0.15)',
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
            <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>Total Completed Services</p>
            <p className="text-4xl font-black text-white">{totalServices}</p>
          </div>
          <div
            className="p-8 rounded-xl transition-all duration-300 group"
            style={{
              background: `linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.02) 100%)`,
              border: '1px solid rgba(6, 182, 212, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)';
            }}
          >
            <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>Total Investment</p>
            <p className="text-4xl font-black" style={{ color: colors.cyan }}>{totalInvestment}</p>
          </div>
        </div>

        {/* Service Timeline */}
        <div className="space-y-4">
          {serviceHistory.map((service, index) => (
            <div key={service.id} className="relative group">
              {/* Timeline Line */}
              {index !== serviceHistory.length - 1 && (
                <div className="absolute left-5 top-16 w-px h-20" style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)' }} />
              )}

              {/* Service Card */}
              <div
                className="p-6 rounded-xl transition-all duration-300"
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
                <div className="flex gap-6">
                  {/* Timeline Circle */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full font-bold"
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
                    <h3 className="text-white font-bold text-base mb-1">{service.name}</h3>
                    <p style={{ color: colors.textDark }} className="text-sm mb-4">{service.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: colors.textMuted }}>Completed</p>
                        <p className="text-white text-sm">{service.completedDate}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: colors.textMuted }}>Duration</p>
                        <p className="text-white text-sm">{service.duration}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: colors.textMuted }}>Investment</p>
                        <p className="text-white text-sm font-bold">{service.investment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
