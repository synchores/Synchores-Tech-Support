import { useEffect, useState } from 'react';
import { THEME } from '../../constant/theme';
import { Footer } from '../../components/layout/footer/Footer';

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</svg>;

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
  <circle cx="12" cy="12" r="3" />
</svg>;

const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
  <line x1="2" x2="22" y1="2" y2="22" />
</svg>;

// const AppleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
//   <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
// </svg>;

// const GoogleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
//   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
//   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
//   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
//   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
//   <path d="M1 1h22v22H1z" fill="none"></path>
// </svg>;

// const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
// </svg>;

export default function TechSupportPage() {
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentIsDark = document.documentElement.classList.contains('dark');
    setIsDark(currentIsDark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const bgColor = isDark ? THEME.colors.darkBg : THEME.colors.white;
  const cardBgColor = isDark ? THEME.colors.darkBgAlt : THEME.colors.white;
  const textPrimary = isDark ? THEME.colors.white : THEME.colors.darkBg;
  const textSecondary = isDark ? THEME.colors.gray[300] : '#6b7280';
  const borderColor = isDark ? 'rgba(30,127,212,0.6)' : 'rgba(0,85,170,0.3)';
  const inputBgColor = isDark ? THEME.colors.darkBgAlt : THEME.colors.gray[100];
  const hoverBgColor = isDark ? 'rgba(30,127,212,0.1)' : 'rgba(0,85,170,0.05)';

  return (
    <div className="relative w-full flex flex-col min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor }}>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Left Column - Logo Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center p-8 transition-colors duration-300" style={{ backgroundColor: bgColor }}>
          <div className="text-center space-y-8">
            <img 
              src="/synchores-logo.png" 
              alt="Synchores Logo" 
              className="w-40 h-40 mx-auto object-contain"
            />
            <div className="space-y-4">
              <h2 className="text-4xl font-bold" style={{ color: textPrimary }}>
                Synchores
              </h2>
              <p className="text-lg" style={{ color: textSecondary }}>
                Streamline Your Service Scheduling
              </p>
            </div>
            <div className="space-y-3 text-left pt-8 border-t" style={{ borderColor }}>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: THEME.colors.accent }}></div>
                <p style={{ color: textSecondary }}>Manage tickets and orders</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: THEME.colors.accent }}></div>
                <p style={{ color: textSecondary }}>Track service requests</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: THEME.colors.accent }}></div>
                <p style={{ color: textSecondary }}>Active Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-16 transition-colors duration-300" style={{ backgroundColor: bgColor }}>
          <div className="relative w-full max-w-sm p-6 space-y-6 rounded-lg border transition-colors duration-300" style={{ backgroundColor: cardBgColor, borderColor }}>
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex p-2 rounded-md border transition-colors duration-300" style={{ backgroundColor: inputBgColor, borderColor }}>
                <div style={{ color: THEME.colors.accent }}>
                  <UserIcon />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight transition-colors duration-300" style={{ color: textPrimary }}>
                  Welcome back
                </h1>
                <p className="text-sm mt-1 transition-colors duration-300" style={{ color: textSecondary }}>
                  Enter your credentials to sign in
                </p>
              </div>
            </div>

            {/* Social Icons - Commented Out */}
            {/* <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <AppleIcon />, label: 'Apple' },
                { icon: <GoogleIcon />, label: 'Google' },
                { icon: <XIcon />, label: 'X' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center h-9 px-3 rounded-md border transition-colors duration-300 hover:opacity-80"
                  style={{ borderColor, backgroundColor: cardBgColor, color: textPrimary }}
                  aria-label={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div> */}

            {/* Divider - Commented Out */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t transition-colors duration-300" style={{ borderColor }} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 transition-colors duration-300" style={{ backgroundColor: cardBgColor, color: textSecondary }}>
                  Or continue with
                </span>
              </div>
            </div> */}

            {/* Form */}
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium transition-colors duration-300" style={{ color: textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="flex h-9 w-full rounded-md border px-3 py-5 text-sm transition-colors duration-300 focus:outline-none focus:ring-1"
                  style={{
                    borderColor,
                    backgroundColor: inputBgColor,
                    color: textPrimary,
                    '--tw-ring-color': THEME.colors.accent,
                  }}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium transition-colors duration-300" style={{ color: textPrimary }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="flex h-9 w-full rounded-md border px-3 py-5 pr-10 text-sm transition-colors duration-300 focus:outline-none focus:ring-1"
                    style={{
                      borderColor,
                      backgroundColor: inputBgColor,
                      color: textPrimary,
                      '--tw-ring-color': THEME.colors.accent,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 hover:opacity-80"
                    style={{ color: THEME.colors.accent }}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-300 h-9 px-4 py-2 hover:opacity-90"
                style={{ backgroundColor: THEME.colors.accent, color: THEME.colors.white }}
              >
                Sign In
              </button>
            </form>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <p className="text-sm transition-colors duration-300" style={{ color: textSecondary }}>
                {/* Don&apos;t have an account?{' '}
                <a href="#" className="font-medium transition-colors duration-300 hover:opacity-80" style={{ color: THEME.colors.accent }}>
                  Sign up
                </a> */}
              </p>
              <a href="#" className="text-sm font-medium block transition-colors duration-300 hover:opacity-80" style={{ color: THEME.colors.accent }}>
                Request New Password?
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Full Width */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
