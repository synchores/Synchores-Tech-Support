import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ClientNavbar from "../../components/modal/ClientNavbar";

function ClientLayout() {
  // Light mode always on
  const themeMode = "light";

  useEffect(() => {
    // Apply light mode
    document.documentElement.classList.remove("dark");
    // Set CSS variables for light mode
    document.documentElement.style.setProperty("--background", "#ffffff");
    document.documentElement.style.setProperty("--foreground", "#030213");
    document.documentElement.style.setProperty("--card", "#ffffff");
    document.documentElement.style.setProperty("--card-foreground", "#030213");
    document.documentElement.style.setProperty("--border", "rgba(0, 0, 0, 0.1)");
    document.documentElement.style.setProperty("--muted-foreground", "#717182");
    document.documentElement.style.setProperty("--chart-2", "#2f8ec2");
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