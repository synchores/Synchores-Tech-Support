import { Outlet } from "react-router-dom";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/sidebar";

function AdminLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Header />
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", width: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;