import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { colors } from '../colors';
import ClientNavbar from '../components/ClientNavbar';
import ClientDashboard from '../pages/client-pages/clientDashboard';
import ClientTickets from '../pages/client-pages/clientTickets';
import ClientServiceHistory from '../pages/client-pages/clientServiceHistory';
import ClientFAQ from '../pages/client-pages/clientFAQ';
import ClientRequestService from '../pages/client-pages/clientRequestService';
import ClientProfile from '../pages/client-pages/clientProfile';

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
    <Router>
      <div style={{ backgroundColor: colors.bgDark, minHeight: '100vh' }}>
        <ClientNavbar />
        <div style={{ paddingTop: '80px' }}> {/* Space for fixed navbar */}
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
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;
