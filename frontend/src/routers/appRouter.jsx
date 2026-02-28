import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { colors } from "../colors";
import ClientNavbar from "../components/modal/ClientNavbar";
import ClientDashboard from "../pages/client-pages/clientDashboard";
import ClientTickets from "../pages/client-pages/clientTickets";
import ClientServiceHistory from "../pages/client-pages/clientServiceHistory";
import ClientFAQ from "../pages/client-pages/clientFAQ";
import ClientRequestService from "../pages/client-pages/clientRequestService";
import ClientProfile from "../pages/client-pages/clientProfile";
import AuthWrapper from "../pages/auth/loginPage";

function AppRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div style={{ backgroundColor: colors.bgDark, minHeight: "100vh" }}>
      {!isLoginPage && <ClientNavbar />}
      <div style={{ paddingTop: isLoginPage ? "0px" : "80px" }}>
          {" "}
          {/* Space for fixed navbar */}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<AuthWrapper />} />
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
    );
  }

export default AppRouter;
