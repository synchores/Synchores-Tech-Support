import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { sileo } from 'sileo';
import { colors } from '../../colors';
import { Icons } from '../Icons';
import { SUBMIT_TICKET_MUTATION } from '../../services/client-service/Mutation';
import { CLIENTS_SERVICE, CLIENTS_TICKETS } from '../../services/client-service/Queries';

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

export default function AddTicketModal({ isOpen, onClose, onSubmit, services: providedServices }) {
  const [submitTicket, { loading }] = useMutation(SUBMIT_TICKET_MUTATION, {
    update(cache, { data }) {
      const createdTicket = data?.createTicket;

      if (!createdTicket) {
        return;
      }

      try {
        const existing = cache.readQuery({ query: CLIENTS_TICKETS });
        const existingTickets = existing?.getMyTickets || [];
        const alreadyExists = existingTickets.some((ticket) => ticket.ticketId === createdTicket.ticketId);

        if (alreadyExists) {
          return;
        }

        cache.writeQuery({
          query: CLIENTS_TICKETS,
          data: {
            getMyTickets: [createdTicket, ...existingTickets],
          },
        });
      } catch {
        cache.writeQuery({
          query: CLIENTS_TICKETS,
          data: {
            getMyTickets: [createdTicket],
          },
        });
      }
    },
  });
  const { data: servicesData, loading: servicesLoading } = useQuery(CLIENTS_SERVICE, {
    skip: Array.isArray(providedServices),
  });
  const services = providedServices ?? servicesData?.getMyServices ?? [];

  const [formData, setFormData] = useState({
    serviceId: '',
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    attachments: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const minDeadlineDate = new Date().toISOString().split('T')[0];

  const validateForm = (values) => {
    const errors = {};

    if (!values.title?.trim()) {
      errors.title = 'Ticket title is required.';
    }

    if (!values.description?.trim()) {
      errors.description = 'Description is required.';
    }

    if (!values.serviceId) {
      errors.serviceId = 'Please select a service.';
    }

    if (!values.deadline) {
      errors.deadline = 'Please choose a deadline.';
    } else if (values.deadline < minDeadlineDate) {
      errors.deadline = 'Deadline cannot be in the past.';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (submitErrorMessage) {
      setSubmitErrorMessage('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          attachments: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      attachments: '',
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    setHasSubmitted(true);
    setSubmitErrorMessage('');

    const validationErrors = validateForm(formData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    const ticketInput = {
      serviceId: Number(formData.serviceId),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      deadline: new Date(`${formData.deadline}T00:00:00.000Z`).toISOString(),
      attachments: formData.attachments || undefined,
    };

    try {
      const response = await submitTicket({
        variables: {
          input: ticketInput,
        },
      });

      onSubmit?.(response?.data?.createTicket || ticketInput);
      setFormData({ serviceId: '', title: '', description: '', priority: 'Medium', deadline: '', attachments: '' });
      setImagePreview(null);
      setFormErrors({});
      setHasSubmitted(false);
      setSubmitErrorMessage('');
      sileo.success({
        title: 'Ticket created',
        description: 'Your ticket has been submitted successfully.',
      });
      onClose();
    } catch (submitError) {
      const apiMessage = submitError?.graphQLErrors?.[0]?.message || submitError?.message || 'Failed to create ticket. Please review your input and try again.';

      if (/already exists|duplicate/i.test(apiMessage)) {
        setFormErrors((prev) => ({
          ...prev,
          title: apiMessage,
        }));
      } else {
        setSubmitErrorMessage(apiMessage);
      }

      console.error('Error submitting ticket:', submitError);
    }
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
          background: `var(--card, #ffffff)`,
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
        <form noValidate onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
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
                background: `var(--card, #ffffff)`,
                border: formErrors.title ? `1px solid ${colors.error}` : `1px solid rgba(6, 182, 212, 0.15)`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                e.target.style.background = 'var(--card, #ffffff)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                e.target.style.background = 'var(--card, #ffffff)';
              }}
            />
            {hasSubmitted && formErrors.title && (
              <p className="text-xs mt-2 font-semibold" style={{ color: colors.error }}>
                {formErrors.title}
              </p>
            )}
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
                background: `var(--card, #ffffff)`,
                border: formErrors.description ? `1px solid ${colors.error}` : `1px solid rgba(6, 182, 212, 0.15)`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                e.target.style.background = 'var(--card, #ffffff)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                e.target.style.background = 'var(--card, #ffffff)';
              }}
            />
            {hasSubmitted && formErrors.description && (
              <p className="text-xs mt-2 font-semibold" style={{ color: colors.error }}>
                {formErrors.description}
              </p>
            )}
          </div>

          {/* Service and Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
                Service
              </label>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                style={{
                  background: `var(--card, #ffffff)`,
                  border: formErrors.serviceId ? `1px solid ${colors.error}` : `1px solid rgba(6, 182, 212, 0.3)`,
                  color: colors.textPrimary,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                  e.target.style.background = 'rgba(6, 182, 212, 0.18)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  e.target.style.background = 'var(--card, #ffffff)';
                }}
              >
                <option value="" disabled>
                  {servicesLoading ? 'Loading services...' : 'Select a service'}
                </option>
                {services.map((service) => (
                  <option key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}
                  </option>
                ))}
              </select>
              {hasSubmitted && formErrors.serviceId && (
                <p className="text-xs mt-2 font-semibold" style={{ color: colors.error }}>
                  {formErrors.serviceId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2.5" style={{ color: colors.textPrimary }}>
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                min={minDeadlineDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                style={{
                  background: `var(--card, #ffffff)`,
                  border: formErrors.deadline ? `1px solid ${colors.error}` : `1px solid rgba(6, 182, 212, 0.3)`,
                  color: colors.textPrimary,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                  e.target.style.background = 'rgba(6, 182, 212, 0.18)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  e.target.style.background = 'var(--card, #ffffff)';
                }}
              />
              {hasSubmitted && formErrors.deadline && (
                <p className="text-xs mt-2 font-semibold" style={{ color: colors.error }}>
                  {formErrors.deadline}
                </p>
              )}
            </div>
          </div>

          {/* Priority */}
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
                background: `var(--card, #ffffff)`,
                border: `1px solid rgba(6, 182, 212, 0.3)`,
                color: colors.textPrimary,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                e.target.style.background = 'rgba(6, 182, 212, 0.18)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                e.target.style.background = 'var(--card, #ffffff)';
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
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
            {submitErrorMessage && (
              <p className="w-full text-xs font-semibold mb-1" style={{ color: colors.error }}>
                {submitErrorMessage}
              </p>
            )}
          </div>

          <div className="flex gap-4">
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
              disabled={loading}
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
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}


