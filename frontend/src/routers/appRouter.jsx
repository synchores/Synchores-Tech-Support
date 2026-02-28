import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { colors } from "../colors";
import ClientNavbar from "../components/modal/ClientNavbar";
import ClientDashboard from "../pages/client-pages/clientDashboard";
import ClientTickets from "../pages/client-pages/clientTickets";
import ClientServiceHistory from "../pages/client-pages/clientServiceHistory";
import ClientFAQ from "../pages/client-pages/clientFAQ";
import ClientRequestService from "../pages/client-pages/clientRequestService";
import ClientProfile from "../pages/client-pages/clientProfile";
import AuthWrapper from "../pages/auth/loginPage";
import { ProtectedRoute } from "./protectedRoute";

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
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  return (
    <div style={{ backgroundColor: colors.bgDark, minHeight: "100vh" }}>
      {!isLoginPage && <ClientNavbar />}
      <div style={{ paddingTop: isLoginPage ? "0px" : "80px" }}>
          {" "}
          {/* Space for fixed navbar */}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <AuthWrapper />} />

            {/* Private Routes */}            
            <Route path="/dashboard" element={
              <ProtectedRoute><ClientDashboard /></ProtectedRoute>
              } />
            <Route path="/tickets" element={
              <ProtectedRoute><ClientTickets /></ProtectedRoute>
              } />
            <Route path="/history" element={
              <ProtectedRoute><ClientServiceHistory /></ProtectedRoute>
              } />
            <Route path="/faq" element={
              <ProtectedRoute><ClientFAQ /></ProtectedRoute>
              } />
            <Route path="/request" element={
              <ProtectedRoute><ClientRequestService /></ProtectedRoute>
              } />
            <Route path="/profile" element={
              <ProtectedRoute><ClientProfile /></ProtectedRoute>
              } />
          </Routes>
        </div>
      </div>
    );
  }

export default AppRouter;
