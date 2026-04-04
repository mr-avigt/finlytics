import useCountUp from "../hooks/useCountUp";
import "./SummaryCard.css";

// Parse numeric value out of formatted string like "₹1,23,456" or "45.2%"
function parseAmount(value) {
  const num = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return isNaN(num) ? null : num;
}

// Re-format the counted-up number to match the original format
function reformat(original, counted) {
  if (String(original).startsWith("₹")) {
    return "₹" + Math.round(counted).toLocaleString("en-IN");
  }
  if (String(original).endsWith("%")) {
    return counted.toFixed(1) + "%";
  }
  return String(Math.round(counted));
}

export default function SummaryCard({ label, value, sub, accent, icon, trend }) {
  const numeric = parseAmount(value);
  const [animated, ref] = useCountUp(numeric ?? 0, 900);
  const displayValue = numeric !== null ? reformat(value, animated) : value;

  return (
    <div className={`summary-card accent-${accent}`} ref={ref}>
      <div className="card-top">
        <span className="card-icon">{icon}</span>
        <span className={`card-trend trend-${trend}`}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"}
        </span>
      </div>

      <div className="card-value">{displayValue}</div>
      <div className="card-label">{label}</div>
      <div className="card-sub">{sub}</div>
      <div className="card-glow" />
    </div>
  );
}
