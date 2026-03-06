import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../colors';
import { Icons } from '../Icons';

export default function ClientNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const sidebarTheme = {
    background: '#0f1629',
    border: 'rgba(255,255,255,0.06)',
    text: '#94a3b8',
    textActive: '#ffffff',
    iconActive: '#60a5fa',
    surface: 'rgba(255,255,255,0.03)',
    surfaceHover: 'rgba(255,255,255,0.07)',
    activeBg: 'linear-gradient(90deg, rgba(59,130,246,0.2), rgba(99,102,241,0.1))',
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'tickets', label: 'Tickets', path: '/tickets' },
    { id: 'shop', label: 'Shop', path: '/shop' },
    { id: 'my-orders', label: 'My Orders', path: '/my-orders' },
    { id: 'history', label: 'Service History', path: '/history' },
    { id: 'faq', label: 'FAQ', path: '/faq' },
    { id: 'request', label: 'Request Service', path: '/request' },
  ];

  return (
    <nav 
      className="fixed top-0 w-full z-50 backdrop-blur-sm border-b" 
      style={{ 
        backgroundColor: sidebarTheme.background,
        borderColor: sidebarTheme.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="text-2xl font-black tracking-tight" style={{ color: '#ffffff' }}>
              <span style={{ color: '#60a5fa' }}>S</span>ynchores
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
                  color: location.pathname === item.path ? sidebarTheme.textActive : sidebarTheme.text,
                  background: location.pathname === item.path ? sidebarTheme.activeBg : 'transparent',
                  borderLeft: location.pathname === item.path ? '2px solid #3b82f6' : '2px solid transparent',
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
                backgroundColor: sidebarTheme.surface,
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = sidebarTheme.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = sidebarTheme.surface;
              }}
            >
              <Icons.Bell size={22} color={sidebarTheme.iconActive} />
            </button>

            {/* User Icon - Profile */}
            <Link
              to="/profile"
              className="p-2.5 rounded-lg transition-all duration-300"
              style={{
                background: location.pathname === '/profile' ? sidebarTheme.activeBg : sidebarTheme.surface,
                borderLeft: location.pathname === '/profile' ? '2px solid #3b82f6' : '2px solid transparent',
              }}
            >
              <Icons.User size={22} color={sidebarTheme.iconActive} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg transition-all duration-300"
              style={{
                background: mobileMenuOpen ? sidebarTheme.activeBg : sidebarTheme.surface,
                borderLeft: mobileMenuOpen ? '2px solid #3b82f6' : '2px solid transparent',
              }}
            >
              <Icons.Menu size={22} color={sidebarTheme.iconActive} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t" style={{ borderColor: sidebarTheme.border }}>
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2.5 rounded-lg transition-all"
                style={{
                  background: location.pathname === item.path ? sidebarTheme.activeBg : 'transparent',
                  color: location.pathname === item.path ? sidebarTheme.textActive : sidebarTheme.text,
                  borderLeft: location.pathname === item.path ? '2px solid #3b82f6' : '2px solid transparent',
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



