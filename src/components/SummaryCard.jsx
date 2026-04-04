import "./SummaryCard.css";

export default function SummaryCard({ label, value, sub, accent, icon, trend }) {
  return (
    <div className={`summary-card accent-${accent}`}>
      <div className="card-top">
        <span className="card-icon">{icon}</span>
        <span className={`card-trend trend-${trend}`}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"}
        </span>
      </div>

      <div className="card-value">{value}</div>

      <div className="card-label">{label}</div>
      <div className="card-sub">{sub}</div>

      <div className="card-glow" />
    </div>
  );
}