import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ClientNavbar from "../components/modal/ClientNavbar";
import ClientDashboard from "../pages/client-pages/clientDashboard";
import ClientTickets from "../pages/client-pages/clientTickets";
import ClientServiceHistory from "../pages/client-pages/clientServiceHistory";
import ClientFAQ from "../pages/client-pages/clientFAQ";
import ClientRequestService from "../pages/client-pages/clientRequestService";
import ClientProfile from "../pages/client-pages/clientProfile";
import AuthWrapper from "../pages/auth/loginPage";
import Header from "../components/layout/header";
import Dashboard from "../pages/admin-pages/adminDashboard";
import Sidebar from "../components/layout/sidebar";
import { ProtectedRoute } from "./protectedRoute";

function AppRouter() {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  return (
    <Router>
      <div style={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
          />

          <Route
            path="/login"
            element={
              token ? <Navigate to="/dashboard" replace /> : <AuthWrapper />
            }
          />

          <Route
            element={
              <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
                <Sidebar />

                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%", overflowX: "hidden" }}
                >
                  {/* <ClientNavbar /> */}
                  <Header />
                  <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", width: "100%" }}>
                    <Outlet />
                  </div>
                </div>
              </div>
            }
          >
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <ClientTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <ClientServiceHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <ClientFAQ />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request"
              element={
                <ProtectedRoute>
                  <ClientRequestService />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ClientProfile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
