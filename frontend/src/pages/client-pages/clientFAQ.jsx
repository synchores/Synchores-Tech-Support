import { useState } from 'react';
import { colors } from '../../colors';
import { Icons } from '../../components/Icons';

export default function ClientFAQ() {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I request a new service?',
      answer: 'You can request a new service by navigating to the "Request Service" section in your dashboard. Fill out the service request form with your requirements and submit. Our team will review it and contact you within 24 hours.',
    },
    {
      id: 2,
      question: 'What is the typical turnaround time for a project?',
      answer: 'Turnaround time varies depending on the complexity of your project. Simple services typically take 1-2 weeks, while complex projects may take 4-8 weeks. We provide estimated timelines during the initial consultation.',
    },
    {
      id: 3,
      question: 'Can I modify a service request after submission?',
      answer: 'Yes, you can modify a service request before our team starts working on it. Please contact support or update it through your dashboard. Once work has started, changes may impact the timeline and cost.',
    },
    {
      id: 4,
      question: 'Do you offer support after project completion?',
      answer: 'Absolutely! We offer ongoing support for all completed services. You can file maintenance tickets or request additional support through your client portal.',
    },
    {
      id: 5,
      question: 'How do I track the progress of my project?',
      answer: 'You can track all project progress through your dashboard. Each ticket shows real-time updates, milestones, and completion status. You can also subscribe to email notifications for updates.',
    },
    {
      id: 6,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and digital payment methods. Invoices are typically issued upon project completion and are due within 30 days.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `var(--background, #ffffff)` }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">FAQ</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>Find answers to common questions</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
              }}
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex justify-between items-center transition-colors"
                style={{ 
                  hover: { backgroundColor: 'rgba(6, 182, 212, 0.05)' }
                }}
              >
                <h3 className="text-white font-bold text-left text-sm">{faq.question}</h3>
                <span
                  style={{
                    display: 'inline-block',
                    transform: expandedId === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: '20px',
                    color: colors.cyan,
                    flexShrink: 0
                  }}
                >
                  <Icons.ChevronDown size={20} color={colors.cyan} />
                </span>
              </button>

              {expandedId === faq.id && (
                <div className="px-6 pb-4 border-t" style={{ borderColor: 'rgba(6, 182, 212, 0.2)' }}>
                  <p style={{ color: colors.textSecondary }} className="leading-relaxed text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-8 rounded-xl text-center"
          style={{
            background: `linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.02) 100%)`,
            border: '1px solid rgba(6, 182, 212, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)'
          }}
        >
          <h3 className="text-white font-bold text-lg mb-2">Didn't find your answer?</h3>
          <p style={{ color: colors.textMuted }} className="mb-6 text-sm">Contact our support team for personalized assistance</p>
          <button 
            className="px-8 py-2.5 rounded-lg font-semibold transition-all duration-300"
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
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}


