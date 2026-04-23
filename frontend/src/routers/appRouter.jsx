import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ClientDashboard from "../pages/client-pages/clientDashboard";
import ClientTickets from "../pages/client-pages/clientTickets";
import ClientServiceHistory from "../pages/client-pages/clientServiceHistory";
import ClientFAQ from "../pages/client-pages/clientFAQ";
import ClientRequestService from "../pages/client-pages/clientRequestService";
import ClientProfile from "../pages/client-pages/clientProfile";
import ClientMyOrders from "../pages/client-pages/clientMyOrders";
import AuthWrapper from "../pages/auth/loginPage";
import Dashboard from "../pages/admin-pages/adminDashboard";
import { ProtectedRoute } from "./protectedRoute";
import { useAuth } from "../context/authContext";
import AdminLayout from "./adminLayout/adminLayout";
import ClientLayout from "./clientLayout/clientLayout";
import LandingPage from "../pages/landing-page/landingPage";
import LandingLayout from "./landingLayout/landingLayout";
import AdminOrders from "../pages/admin-pages/adminOrders";
import AdminTickets from "../pages/admin-pages/adminTickets";
import AdminHeroLanding from "../pages/admin-pages/adminHeroLanding";
import AdminLandingServices from "../pages/admin-pages/adminLandingServices";
import AdminDeploymentGallery from "../pages/admin-pages/adminDeploymentGallery";
import AdminCompanySettings from "../pages/admin-pages/adminCompanySettings";
import ClientServiceRequestForm from "../pages/client-pages/clientServiceRequestForm";
import { Shop } from "../pages/client-pages/clientShop";
import ClientPreOrder from "../pages/client-pages/clientPreOrder";
import OfferingDetail from "../pages/landing-page/sections/offering/offeringDetail";
import DeploymentsPage from "../pages/landing-page/deploymentsPage";
import TechSupportPage from "../pages/landing-page/techSupportPage";
import Fallback from "./fallback/fallback.jsx";


const getRoleBasedHomePath = (user) => {
  if (!user?.role) {
    return "/dashboard";
  }

  if (user.role === "admin") {
    return "/admin/dashboard";
  }

  return "/dashboard";
};

function AppRouter() {
  const { user, isAuthLoading } = useAuth();
  const token = localStorage.getItem("accessToken");
  const defaultAuthenticatedPath = getRoleBasedHomePath(user);

  if (token && isAuthLoading) {
    return null;
  }

  return (
    <Router>
      <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingLayout>
                <LandingPage />
              </LandingLayout>
            }
          />

          <Route
            path="/offering/:id"
            element={<OfferingDetail />}
          />

          <Route
            path="/deployments"
            element={<DeploymentsPage />}
          />

          <Route
            path="/tech-support"
            element={
              <LandingLayout>
                <TechSupportPage />
              </LandingLayout>
            }
          />

          <Route
            path="/login"
            element={
              token ? <Navigate to={defaultAuthenticatedPath} replace /> : <AuthWrapper />
            }
          />

          <Route
            path="/unauthorized"
            element={
              <div className="min-h-screen flex items-center justify-center bg-bgDark px-4 text-white">
                <div className="rounded-lg bg-primary p-8 max-w-md w-full text-center">
                  <h1 className="text-2xl font-semibold">Unauthorized</h1>
                  <p className="mt-2 text-textSecondary">
                    Your account does not have access to this page.
                  </p>
                </div>
              </div>
            }
          />
          <Route
            path="/request-service"
            element={<ClientServiceRequestForm />}
          />

          <Route
            element={ 
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />
            <Route
              path="/admin/tickets"
              element={<AdminTickets />}
            />
            <Route
              path="/admin/landing-page/hero"
              element={<AdminHeroLanding />}
            />
            <Route
              path="/admin/landing-page/services"
              element={<AdminLandingServices />}
            />
            <Route
              path="/admin/landing-page/gallery"
              element={<AdminDeploymentGallery />}
            />
            <Route
              path="/admin/landing-page/settings"
              element={<AdminCompanySettings />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={<ClientDashboard />}
            />
            <Route
              path="/tickets"
              element={<ClientTickets />}
            />
            <Route
              path="/my-orders"
              element={<ClientMyOrders />}
            />
            <Route
              path="/history"
              element={<ClientServiceHistory />}
            />
            <Route
              path="/faq"
              element={<ClientFAQ />}
            />
            <Route
              path="/shop"
              element={<Shop />}
            />
            <Route
              path="/shop/pre-order/:productId"
              element={<ClientPreOrder />}
            />
            <Route
              path="/request"
              element={<ClientRequestService />}
            />
            <Route
              path="/profile"
              element={<ClientProfile />}
            />
          </Route>

          <Route
            path="*"
            element={<Fallback />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
