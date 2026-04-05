import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ReloadCountdown from "./components/ReloadCountdown";
import "./App.css";

function isMobile() {
  return window.innerWidth < 768;
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  // Open on desktop, closed on mobile by default
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile());

  // On resize, auto-close sidebar when shrinking to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When on mobile, close sidebar
  const handlePageChange = (page) => {
    setActivePage(page);
    if (isMobile()) setSidebarOpen(false);
  };

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Mobile overlay — clicking it closes the sidebar */}
      {sidebarOpen && isMobile() && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="main-area">
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activePage={activePage} />
        <main className="page-content">
          <div key={activePage} className="page-wrapper">
            {activePage === "dashboard" && <Dashboard setActivePage={handlePageChange} />}
            {activePage === "transactions" && <Transactions />}
            {activePage === "insights" && <Insights />}
          </div>
        </main>
      </div>
      <ReloadCountdown />
    </div>
  );
}
