import { useSelector, useDispatch } from "react-redux";
import { setRole } from "../store/uiSlice";
import { toggleDarkMode } from "../store/uiSlice";
import "./Header.css";

const PAGE_TITLES = { dashboard: "Dashboard", transactions: "Transactions", insights: "Insights" };

export default function Header({ setSidebarOpen, sidebarOpen, activePage }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.ui.role);
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <span /><span /><span />
        </button>
        <h1 className="page-title gradient-text">{PAGE_TITLES[activePage]}</h1>
      </div>

      <div className="header-right">
        <div className="role-selector">
          <span className="role-label">Role:</span>
          <select
            value={role}
            onChange={(e) => dispatch(setRole(e.target.value))}
            className="role-select"
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">⚡ Admin</option>
          </select>
        </div>

        <button
          className="theme-toggle"
          onClick={() => dispatch(toggleDarkMode())}
          aria-label="Toggle dark mode"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? "☀" : "◑"}
        </button>

        <div className="user-avatar">
          <span>{role === "admin" ? "A" : "V"}</span>
        </div>
      </div>
    </header>
  );
}
