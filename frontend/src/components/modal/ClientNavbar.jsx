import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../colors';
import { Icons } from '../Icons';

export default function ClientNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'tickets', label: 'Tickets', path: '/tickets' },
    { id: 'history', label: 'Service History', path: '/history' },
    { id: 'faq', label: 'FAQ', path: '/faq' },
    { id: 'request', label: 'Request Service', path: '/request' },
  ];

  return (
    <nav 
      className="fixed top-0 w-full z-50 backdrop-blur-sm border-b" 
      style={{ 
        backgroundColor: `rgba(20, 40, 70, 0.95)`,
        borderColor: `rgba(6, 182, 212, 0.1)`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="text-white text-2xl font-black tracking-tight">
              <span style={{ color: colors.cyan }}>S</span>ynchores
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
                style={{
                  color: location.pathname === item.path ? colors.cyan : colors.textSecondary,
                  backgroundColor: location.pathname === item.path ? `rgba(6, 182, 212, 0.15)` : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Bell Icon - Notification */}
            <button 
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.08)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
              }}
            >
              <Icons.Bell size={22} color={colors.cyan} />
            </button>

            {/* User Icon - Profile */}
            <Link
              to="/profile"
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: location.pathname === '/profile' ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.08)',
                boxShadow: location.pathname === '/profile' 
                  ? '0 8px 20px rgba(6, 182, 212, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)' 
                  : '0 4px 12px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <Icons.User size={22} color={colors.cyan} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: mobileMenuOpen ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.08)',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <Icons.Menu size={22} color={colors.cyan} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t" style={{ borderColor: 'rgba(6, 182, 212, 0.1)' }}>
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: location.pathname === item.path ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: location.pathname === item.path ? colors.cyan : colors.textSecondary
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

