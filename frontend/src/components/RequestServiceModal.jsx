import { useState } from 'react';
import { colors } from '../colors';
import { Icons } from './Icons';
import { SERVICE_REQUIREMENTS } from '../serviceConfig';

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
      // If "Other" is selected for a select field, require the custom input
      if (field.type === 'select' && formData[field.name] === 'Other' && !formData[`${field.name}_custom`]) {
        newErrors[`${field.name}_custom`] = `Please specify your ${field.label.toLowerCase()}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        serviceType: clientServiceType,
        ...formData,
        submittedDate: new Date().toISOString().split('T')[0]
      });
      setFormData({});
      setErrors({});
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
        onClick={handleBackdropClick}
      >
      <div 
        className="w-full rounded-2xl shadow-2xl flex flex-col"
        style={{
          background: `linear-gradient(135deg, ${colors.blue700} 0%, ${colors.blue800} 100%)`,
          border: `1px solid rgba(6, 182, 212, 0.2)`,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          maxHeight: '75vh',
          maxWidth: '500px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b flex-shrink-0" style={{ borderColor: 'rgba(107, 114, 128, 0.2)' }}>
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
            {serviceConfig.label}
          </p>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6 overflow-y-auto flex-1 service-modal-scroll">
          {serviceConfig.fields.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
                {field.label}
                {field.required && <span style={{ color: colors.cyan }}> *</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 resize-none"
                  style={{
                    background: `rgba(20, 40, 70, 0.6)`,
                    border: `1px solid rgba(6, 182, 212, 0.15)`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                    e.target.style.background = 'rgba(20, 40, 70, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                    e.target.style.background = 'rgba(20, 40, 70, 0.6)';
                  }}
                />
              ) : field.type === 'select' ? (
                <>
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: `rgba(25, 51, 87, 0.6)`,
                      border: `1px solid rgba(6, 182, 212, 0.3)`,
                      color: colors.textPrimary,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                      e.target.style.background = 'rgba(6, 182, 212, 0.18)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                      e.target.style.background = 'rgba(25, 51, 87, 0.6)';
                    }}
                  >
                    {!formData[field.name] && <option value="">Select {field.label}</option>}
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  
                  {formData[field.name] === 'Other' && (
                    <>
                      <input
                        type="text"
                        name={`${field.name}_custom`}
                        value={formData[`${field.name}_custom`] || ''}
                        onChange={handleChange}
                        placeholder={`Please specify your ${field.label.toLowerCase()}`}
                        className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300 mt-2"
                        style={{
                          background: `rgba(20, 40, 70, 0.6)`,
                          border: `1px solid rgba(6, 182, 212, 0.15)`,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                          e.target.style.background = 'rgba(20, 40, 70, 0.8)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                          e.target.style.background = 'rgba(20, 40, 70, 0.6)';
                        }}
                      />
                      {errors[`${field.name}_custom`] && (
                        <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                          {errors[`${field.name}_custom`]}
                        </p>
                      )}
                    </>
                  )}
                </>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                  style={{
                    background: `rgba(20, 40, 70, 0.6)`,
                    border: `1px solid rgba(6, 182, 212, 0.15)`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                    e.target.style.background = 'rgba(20, 40, 70, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                    e.target.style.background = 'rgba(20, 40, 70, 0.6)';
                  }}
                />
              )}

              {errors[field.name] && (
                <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </form>

        {/* Buttons - Sticky Footer */}
        <div className="px-8 py-6 border-t flex-shrink-0 flex gap-4" style={{ borderColor: 'rgba(107, 114, 128, 0.2)' }}>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 border"
            style={{
              borderColor: `rgba(6, 182, 212, 0.2)`,
              color: colors.textSecondary,
              background: 'rgba(6, 182, 212, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(6, 182, 212, 0.12)';
              e.target.style.borderColor = 'rgba(6, 182, 212, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(6, 182, 212, 0.05)';
              e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)';
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${colors.cyan} 0%, ${colors.cyanMuted} 100%)`,
              color: colors.primary,
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.25)';
            }}
          >
            <Icons.Send size={18} color={colors.primary} />
            Submit Request
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
