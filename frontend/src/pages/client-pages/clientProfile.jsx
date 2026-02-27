import { useState } from 'react';
import { colors } from '../../colors';

export default function ClientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Innovations Inc.',
    address: '123 Tech Street, San Francisco, CA 94102',
    joinDate: '2025-06-15',
  });

  const [editData, setEditData] = useState(profileData);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const validatePassword = () => {
    if (!passwordData.currentPassword) {
      setPasswordError('Current password is required');
      return false;
    }
    if (!passwordData.newPassword) {
      setPasswordError('New password is required');
      return false;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordError('New password must be different from current password');
      return false;
    }
    return true;
  };

  const handleSavePassword = () => {
    if (validatePassword()) {
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordSuccess('');
      }, 2000);
    }
  };

  const handleCancelPassword = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
    setPasswordSuccess('');
    setIsChangingPassword(false);
  };

  const stats = [
    { label: 'Active Services', value: '3' },
    { label: 'Completed', value: '12' },
    { label: 'Total Invested', value: '$45K' },
    { label: 'Member Since', value: '2025' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${colors.blue900} 0%, ${colors.blue800} 100%)` }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Profile Settings</h1>
            <p className="text-lg" style={{ color: colors.textMuted }}>Manage your account information</p>
          </div>
          <button 
            className="px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border"
            style={{
              borderColor: 'rgba(239, 68, 68, 0.3)',
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              color: '#ef4444',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
              e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
              e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl transition-all duration-500 cursor-pointer group"
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
              <p className="text-sm font-semibold mb-3 tracking-wide" style={{ color: colors.textMuted }}>
                {stat.label}
              </p>
              <p className="text-4xl font-black" style={{ color: colors.cyan }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Profile Information */}
        <div 
          className="rounded-xl p-8"
          style={{
            background: 'rgba(20, 40, 70, 0.4)',
            border: '1px solid rgba(107, 114, 128, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">Account Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                style={{
                  backgroundColor: colors.cyan,
                  color: colors.primary,
                  boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
                }}
              >
                ✏️ Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form className="space-y-6">
              {[
                { label: 'Full Name', name: 'name' },
                { label: 'Email Address', name: 'email', type: 'email' },
                { label: 'Phone Number', name: 'phone', type: 'tel' },
                { label: 'Company Name', name: 'company' },
                { label: 'Address', name: 'address' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={editData[field.name]}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(20, 40, 70, 0.8)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    }}
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: colors.cyan,
                    color: colors.primary,
                    boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-2.5 rounded-lg font-semibold border transition-all duration-300"
                  style={{
                    borderColor: colors.cyanMuted,
                    color: colors.cyan,
                    backgroundColor: 'rgba(6, 182, 212, 0.04)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.04)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              {[
                { icon: '👤', label: 'Full Name', value: 'name' },
                { icon: '✉️', label: 'Email Address', value: 'email' },
                { icon: '☎️', label: 'Phone Number', value: 'phone' },
                { icon: '🏢', label: 'Company', value: 'company' },
                { icon: '📍', label: 'Address', value: 'address' },
              ].map((item, idx) => (
                <div
                  key={item.value}
                  className="flex items-start gap-4 pb-5"
                  style={{
                    borderBottom: idx !== 4 ? '1px solid rgba(107, 114, 128, 0.15)' : 'none'
                  }}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <p style={{ color: colors.textDark }} className="text-xs font-semibold mb-1">{item.label}</p>
                    <p className="text-white text-sm font-semibold">{profileData[item.value]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Member Since */}
        <div 
          className="mt-8 p-6 rounded-xl text-center"
          style={{
            background: `linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.03) 100%)`,
            border: '1px solid rgba(6, 182, 212, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.08)'
          }}
        >
          <p style={{ color: colors.textDark }} className="text-xs font-semibold mb-2">Member Since</p>
          <p className="text-white font-bold text-lg">{profileData.joinDate}</p>
        </div>

        {/* Change Password Section */}
        <div 
          className="rounded-xl p-8 mt-8"
          style={{
            background: 'rgba(20, 40, 70, 0.4)',
            border: '1px solid rgba(107, 114, 128, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">Security Settings</h2>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                style={{
                  backgroundColor: colors.cyan,
                  color: colors.primary,
                  boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
                }}
              >
                🔐 Change Password
              </button>
            )}
          </div>

          {isChangingPassword ? (
            <form className="space-y-6">
              {passwordError && (
                <div 
                  className="p-4 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}
                >
                  ⚠️ {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div 
                  className="p-4 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  ✓ {passwordSuccess}
                </div>
              )}

              {[
                { label: 'Current Password', name: 'currentPassword', type: 'password' },
                { label: 'New Password', name: 'newPassword', type: 'password' },
                { label: 'Confirm New Password', name: 'confirmPassword', type: 'password' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={passwordData[field.name]}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(20, 40, 70, 0.8)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    }}
                    placeholder="●●●●●●●●"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSavePassword}
                  className="flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: colors.cyan,
                    color: colors.primary,
                    boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
                  }}
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={handleCancelPassword}
                  className="flex-1 py-2.5 rounded-lg font-semibold border transition-all duration-300"
                  style={{
                    borderColor: colors.cyanMuted,
                    color: colors.cyan,
                    backgroundColor: 'rgba(6, 182, 212, 0.04)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.04)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p style={{ color: colors.textMuted }} className="text-sm">
                Keep your account secure by regularly updating your password
              </p>
              <div className="flex items-center gap-2" style={{ color: colors.textDark }}>
                <span>🔒</span>
                <span className="text-xs">Password requirements: Minimum 8 characters</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
