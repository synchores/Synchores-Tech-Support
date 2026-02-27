import { useState } from 'react';
import { colors } from '../colors';
import ClientNavbar from '../components/ClientNavbar';
import ClientDashboard from './ClientDashboard';
import ClientTickets from './clientTickets';
import ClientServiceHistory from './clientServiceHistory';
import ClientFAQ from './ClientFAQ';
import ClientRequestService from './clientRequestService';
import ClientProfile from './clientProfile';

function AppClient() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <ClientDashboard />;
      case 'tickets':
        return <ClientTickets />;
      case 'history':
        return <ClientServiceHistory />;
      case 'faq':
        return <ClientFAQ />;
      case 'request':
        return <ClientRequestService />;
      case 'profile':
        return <ClientProfile />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
      <div style={{ backgroundColor: colors.bgDark }}>
      <ClientNavbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default AppClient;
