import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ClientNavbar from "../../components/modal/ClientNavbar";

function ClientLayout() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");

    // Remove route-level token overrides so admin pages keep their own palette.
    [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--border",
      "--muted-foreground",
      "--chart-2",
    ].forEach((token) => {
      root.style.removeProperty(token);
    });
  }, []);

  return (
    <div
      className="client-theme"
      style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}
    >
      <ClientNavbar />
      <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;