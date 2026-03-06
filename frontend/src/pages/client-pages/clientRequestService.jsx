import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../colors';
import { Icons } from '../../components/Icons';
import { useAuth } from '../../context/authContext';

export default function ClientRequestService() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: '',
    projectGoals: '',
    currentSituation: '',
    description: '',
    timeline: '',
    preferredContact: 'email',
    additionalNotes: '',
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files[0] || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Service request submitted successfully!');
    setFormData({
      serviceType: '',
      projectGoals: '',
      currentSituation: '',
      description: '',
      timeline: '',
      preferredContact: 'email',
      additionalNotes: '',
      attachments: null,
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
    'Consulting',
    'Other',
  ];

  const timelineOptions = [
    'ASAP (1-2 weeks)',
    'Soon (3-4 weeks)',
    'Flexible (1-2 months)',
    'Not urgent',
  ];

  const contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'video', label: 'Video Call' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `var(--background, #ffffff)` }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Request a Service</h1>
          <p className="text-lg" style={{ color: colors.textMuted }}>Tell us what you need and we'll get back to you</p>
        </div>

        {/* Contact Info Preview */}
        <div
          className="mb-8 p-6 rounded-xl"
          style={{
            background: `var(--card, #ffffff)`,
            border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-sm font-bold" style={{ color: colors.textMuted }}>Contact Information</h2>
            <button
              onClick={() => navigate('/profile')}
              className="text-xs px-3 py-1 rounded-lg transition-all"
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                color: colors.cyan,
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}
            >
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs" style={{ color: colors.textMuted }}>Full Name</p>
              <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textMuted }}>Email</p>
              <p className="text-sm font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textMuted }}>Phone</p>
              <p className="text-sm font-semibold">{user?.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.textMuted }}>Company</p>
              <p className="text-sm font-semibold">{user?.companyName || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Service Type *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              <option value="">Select a service type</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Project Goals */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Project Goals *</label>
            <input
              type="text"
              name="projectGoals"
              value={formData.projectGoals}
              onChange={handleChange}
              required
              placeholder="e.g., Increase sales by 30%, Improve user experience, Migrate to cloud"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            />
          </div>

          {/* Current Situation */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Current Situation / Problem *</label>
            <textarea
              name="currentSituation"
              value={formData.currentSituation}
              onChange={handleChange}
              required
              placeholder="What's the pain point? e.g., Slow website, No mobile app, Outdated system..."
              rows="4"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 resize-none"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Project Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your project in detail..."
              rows="6"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 resize-none"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">File Attachments (Optional)</label>
            <input
              type="file"
              name="attachments"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-300"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
            />
            <p className="text-xs mt-2" style={{ color: colors.textMuted }}>Upload requirements, wireframes, contracts, or reference materials</p>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Timeline *</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Preferred Contact Method *</label>
            <div className="space-y-3">
              {contactMethods.map(method => (
                <label key={method.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method.value}
                    checked={formData.preferredContact === method.value}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 text-sm" style={{ color: colors.textPrimary }}>{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-white font-bold text-sm mb-3 tracking-wide">Additional Notes (Optional)</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information or requirements..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 resize-none"
              style={{
                background: `var(--card, #ffffff)`,
                border: '1px solid var(--border, rgba(0, 0, 0, 0.1))',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.boxShadow = '0 8px 32px rgba(6, 182, 212, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border, rgba(0, 0, 0, 0.1))';
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
              You'll receive contact via {formData.preferredContact === 'email' ? 'email' : formData.preferredContact === 'phone' ? 'phone call' : 'video call'} with an estimated timeline
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


