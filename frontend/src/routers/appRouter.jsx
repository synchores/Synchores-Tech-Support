import { useState } from 'react';
import { colors } from '../colors';
import ClientNavbar from '../components/ClientNavbar';
import ClientDashboard from './ClientDashboard';
import ClientTickets from './clientTickets';
import ClientServiceHistory from './clientServiceHistory';
import ClientFAQ from './ClientFAQ';
import ClientRequestService from './clientRequestService';
import ClientProfile from './clientProfile';

function AppRouter() {
  // const [currentPage, setCurrentPage] = useState('dashboard');

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case 'dashboard':
  //       return <ClientDashboard />;
  //     case 'tickets':
  //       return <ClientTickets />;
  //     case 'history':
  //       return <ClientServiceHistory />;
  //     case 'faq':
  //       return <ClientFAQ />;
  //     case 'request':
  //       return <ClientRequestService />;
  //     case 'profile':
  //       return <ClientProfile />;
  //     default:
  //       return <ClientDashboard />;
  //   }
  // };

  return (
      // <div style={{ backgroundColor: colors.bgDark }}>
      //   <ClientNavbar currentPage={currentPage} onNavigate={setCurrentPage} />
      //   {renderPage()}
      // </div>

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/tickets" element={<ClientTickets />} />
          <Route path="/history" element={<ClientServiceHistory />} />
          <Route path="/faq" element={<ClientFAQ />} />
          <Route path="/request" element={<ClientRequestService />} />
          <Route path="/profile" element={<ClientProfile />} />
          
          {/* Private Routes */}

        </Routes>
      </Router>
  );
}

export default AppRouter;
