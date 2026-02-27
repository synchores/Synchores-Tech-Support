import { useState } from 'react';
import { colors } from '../../colors';
import { Icons } from '../../components/Icons';

export default function ClientRequestService() {
  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    budget: '',
    timeline: '',
    email: '',
    attachments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Service request submitted successfully!');
    setFormData({
      serviceType: '',
      description: '',
      budget: '',
      timeline: '',
      email: '',
      attachments: '',
    });
  };

  const serviceTypes = [
    'Web Development',
    'UI/UX Design',
    'Mobile App Development',
    'SEO Optimization',
    'Digital Marketing',
    'Content Writing',
    'Branding',
    'Other',
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  const timelineOptions = [
    'ASAP (1-2 weeks)',
    'Soon (3-4 weeks)',
    'Flexible (1-2 months)',
    'Not urgent',
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${colors.blue900} 0%, ${colors.blue800} 100%)` }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Request a Service</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>Tell us what you need and we'll get back to you</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `rgba(20, 40, 70, 0.4)`,
                border: '1px solid rgba(107, 114, 128, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(107, 114, 128, 0.15)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              <option value="">Select a service type</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your project in detail..."
              rows="6"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 resize-none"
              style={{
                background: `rgba(20, 40, 70, 0.4)`,
                border: '1px solid rgba(107, 114, 128, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
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

          {/* Budget */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Budget Range</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `rgba(20, 40, 70, 0.4)`,
                border: '1px solid rgba(107, 114, 128, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(107, 114, 128, 0.15)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              <option value="">Select your budget range</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Timeline</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `rgba(20, 40, 70, 0.4)`,
                border: '1px solid rgba(107, 114, 128, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(107, 114, 128, 0.15)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `rgba(20, 40, 70, 0.4)`,
                border: '1px solid rgba(107, 114, 128, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
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

          {/* Additional Notes */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Additional Notes (Optional)</label>
            <textarea
              name="attachments"
              value={formData.attachments}
              onChange={handleChange}
              placeholder="Any additional information or requirements..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 resize-none"
              style={{
                background: `rgba(20, 40, 70, 0.4)`,
                border: '1px solid rgba(107, 114, 128, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2"
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
            <Icons.Send size={18} color={colors.primary} />
            <span>Submit Service Request</span>
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-xl"
          style={{
            background: `linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(6, 182, 212, 0.02) 100%)`,
            border: '1px solid rgba(6, 182, 212, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)'
          }}
        >
          <h3 className="text-white font-bold mb-3 text-sm">What happens next?</h3>
          <ul style={{ color: colors.textSecondary }} className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Icons.Check size={16} color={colors.success} />
              Our team reviews your request within 24 hours
            </li>
            <li className="flex items-center gap-2">
              <Icons.Check size={16} color={colors.success} />
              You'll receive an email confirmation and estimated timeline
            </li>
            <li className="flex items-center gap-2">
              <Icons.Check size={16} color={colors.success} />
              A project manager will be assigned to your service
            </li>
            <li className="flex items-center gap-2">
              <Icons.Check size={16} color={colors.success} />
              We'll discuss next steps and finalize the details
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
