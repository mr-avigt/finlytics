import { useSelector } from "react-redux";
import "./Sidebar.css";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "insights", label: "Insights", icon: "◎" },
];

export default function Sidebar({ activePage, setActivePage, sidebarOpen }) {
  const role = useSelector((state) => state.ui.role);

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo">
        <span className="logo-mark">◈</span>
        {sidebarOpen && <span className="logo-text">Finlytics</span>}
      </div>

      <nav className="sidebar-nav">
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => setActivePage(item.id)}
            title={!sidebarOpen ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {sidebarOpen && <span className="nav-label">{item.label}</span>}
            {activePage === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {sidebarOpen && (
          <div className="role-badge">
            <span className={`role-dot ${role}`} />
            <span>{role === "admin" ? "Admin" : "Viewer"}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
