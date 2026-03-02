import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
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
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  return (
    <Router>
      <div style={{ backgroundColor: colors.bgDark, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />

          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <AuthWrapper />} />

          <Route
            element={
              <>
                <ClientNavbar />
                <div style={{ paddingTop: "80px" }}>
                  <Outlet />
                </div>
              </>
            }
          >
            <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><ClientTickets /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><ClientServiceHistory /></ProtectedRoute>} />
            <Route path="/faq" element={<ProtectedRoute><ClientFAQ /></ProtectedRoute>} />
            <Route path="/request" element={<ProtectedRoute><ClientRequestService /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
        </Routes>
        </div>
    </Router>
  );
}

export default AppRouter;
