import { useState } from 'react';
import { colors } from '../../colors';
import { Icons } from '../Icons';
import { SERVICE_REQUIREMENTS } from '../../serviceConfig';

// Add styles for select options and scrollbar
const selectOptionStyles = `
  select option {
    background: rgba(25, 51, 87, 0.95);
    color: #f3f4f6;
    padding: 8px 4px;
  }
  select option:checked {
    background: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }
  
  .service-modal-scroll::-webkit-scrollbar {
    width: 8px;
  }
  
  .service-modal-scroll::-webkit-scrollbar-track {
    background: rgba(6, 182, 212, 0.05);
    border-radius: 10px;
  }
  
  .service-modal-scroll::-webkit-scrollbar-thumb {
    background: rgba(6, 182, 212, 0.4);
    border-radius: 10px;
    transition: background 0.2s ease;
  }
  
  .service-modal-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(6, 182, 212, 0.6);
  }
`;

export default function RequestServiceModal({ isOpen, onClose, clientServiceType, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const serviceConfig = SERVICE_REQUIREMENTS[clientServiceType];
  
  if (!serviceConfig) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    serviceConfig.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
    setFormData({});
    setErrors({});
  };

  return (
    <>
      <style>{selectOptionStyles}</style>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      >
        <div
          className="w-full max-w-xl rounded-2xl shadow-2xl flex flex-col"
          style={{
            background: `var(--card, #ffffff)`,
            border: `1px solid rgba(6, 182, 212, 0.2)`,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b" style={{ borderColor: 'rgba(107, 114, 128, 0.2)' }}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-white tracking-tight">Request New Service</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-all hover:bg-gray-700/40"
                style={{ color: colors.textMuted }}
              >
                <Icons.Close size={24} />
              </button>
            </div>
            <p className="text-sm mt-1" style={{ color: colors.textDark }}>
              Fill out the form to request a new service
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6 overflow-y-auto flex-1 service-modal-scroll">
            {serviceConfig.fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
                  {field.label}
                  {field.required && <span style={{ color: colors.cyan }}> *</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: `var(--card, #ffffff)`,
                      border: `1px solid rgba(6, 182, 212, 0.3)`,
                      color: colors.textPrimary,
                    }}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: `var(--card, #ffffff)`,
                      border: `1px solid rgba(6, 182, 212, 0.15)`
                    }}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-xs mt-1" style={{ color: colors.error }}>{errors[field.name]}</p>
                )}
              </div>
            ))}
            <div className="flex gap-4 pt-4 border-t" style={{ borderColor: 'rgba(107, 114, 128, 0.2)' }}>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 border"
                style={{
                  borderColor: `rgba(6, 182, 212, 0.2)`,
                  color: colors.textSecondary,
                  background: 'rgba(6, 182, 212, 0.05)'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.cyanMuted} 100%)`,
                  color: colors.primary,
                  boxShadow: '0 10px 30px rgba(6, 182, 212, 0.25)'
                }}
              >
                <Icons.Send size={18} color={colors.primary} />
                Request Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


