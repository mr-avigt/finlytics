import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} sidebarOpen={sidebarOpen} />
      <div className="main-area">
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activePage={activePage} />
        <main className="page-content">
          <div key={activePage} className="page-wrapper">
            {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}
            {activePage === "transactions" && <Transactions />}
            {activePage === "insights" && <Insights />}
          </div>
        </main>
      </div>
    </div>
  );
}
