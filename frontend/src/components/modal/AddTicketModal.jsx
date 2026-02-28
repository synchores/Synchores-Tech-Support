import { useState } from 'react';
import { colors } from '../../colors';
import { Icons } from '../Icons';

// Add styles for select options
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
`;

export default function AddTicketModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'General',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', priority: 'Medium', category: 'General', image: null });
    setImagePreview(null);
  };

  if (!isOpen) return null;

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
        className="w-full max-w-lg rounded-2xl shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${colors.blue700} 0%, ${colors.blue800} 100%)`,
          border: `1px solid rgba(6, 182, 212, 0.2)`,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b" style={{ borderColor: 'rgba(107, 114, 128, 0.2)' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-white tracking-tight">Create New Ticket</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all hover:bg-gray-700/40"
              style={{ color: colors.textMuted }}
            >
              <Icons.Close size={24} />
            </button>
          </div>
          <p className="text-sm mt-1" style={{ color: colors.textDark }}>
            Describe your issue and we'll help you as soon as possible
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
              Ticket Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Brief description of your issue"
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
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Provide more details about your issue..."
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
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
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
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
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
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
              Attach Image <span style={{ color: colors.textMuted }}>(Optional)</span>
            </label>
            
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-40 object-cover rounded-lg border"
                  style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 rounded-lg transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: colors.cyan,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0, 0, 0, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                  }}
                >
                  <Icons.Close size={18} />
                </button>
              </div>
            ) : (
              <label 
                className="block p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all text-center"
                style={{
                  borderColor: 'rgba(6, 182, 212, 0.3)',
                  background: 'rgba(6, 182, 212, 0.02)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.02)';
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <div className="flex flex-col items-center justify-center">
                  <Icons.Upload size={24} color={colors.cyan} />
                  <p className="text-sm font-semibold mt-2" style={{ color: colors.cyan }}>
                    Click to upload image
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </label>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t" style={{ borderColor: 'rgba(107, 114, 128, 0.2)' }}>
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
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
