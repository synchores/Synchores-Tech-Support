import { Outlet } from "react-router-dom";
import ClientNavbar from "../../components/modal/ClientNavbar";

function ClientLayout() {
  return (
    <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <ClientNavbar />
      <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;