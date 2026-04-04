import { useMemo } from "react";
import "./SpendingBreakdown.css";

const COLORS = [
  "#6C63FF", "#FF6B6B", "#4ECDC4", "#FFD93D", "#A8E6CF",
  "#FF8B94", "#B4A7D6", "#81C784", "#FFB74D", "#4FC3F7"
];

export default function SpendingBreakdown({ transactions }) {
  const data = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    const total = Object.values(map).reduce((s, v) => s + v, 0);
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, amt], i) => ({
        cat, amt,
        pct: total ? ((amt / total) * 100).toFixed(1) : 0,
        color: COLORS[i % COLORS.length]
      }));
  }, [transactions]);

  if (!data.length) return <div className="chart-empty">No expense data</div>;

  // Build donut arcs
  const R = 70, r = 42, cx = 90, cy = 90;
  let startAngle = -Math.PI / 2;
  const total = data.reduce((s, d) => s + d.amt, 0);

  const arcs = data.map(d => {
    const angle = (d.amt / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(endAngle);
    const y2 = cy + R * Math.sin(endAngle);
    const ix1 = cx + r * Math.cos(startAngle);
    const iy1 = cy + r * Math.sin(startAngle);
    const ix2 = cx + r * Math.cos(endAngle);
    const iy2 = cy + r * Math.sin(endAngle);
    const large = angle > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${r} ${r} 0 ${large} 0 ${ix1} ${iy1} Z`;
    startAngle = endAngle;
    return { ...d, path };
  });

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="spending-breakdown">
      <div className="donut-wrap">
        <svg width={180} height={180} viewBox="0 0 180 180">
          {arcs.map((arc, i) => (
            <path key={arc.cat} d={arc.path} fill={arc.color} className="donut-arc"
              style={{ "--delay": `${i * 0.05}s` }} />
          ))}
          <text x={cx} y={cy - 8} textAnchor="middle" className="donut-center-label">Total</text>
          <text x={cx} y={cy + 10} textAnchor="middle" className="donut-center-value">
            {fmt(total)}
          </text>
        </svg>
      </div>
      <ul className="breakdown-list">
        {data.slice(0, 6).map(d => (
          <li key={d.cat} className="breakdown-item">
            <span className="breakdown-dot" style={{ background: d.color }} />
            <span className="breakdown-cat">{d.cat}</span>
            <span className="breakdown-pct">{d.pct}%</span>
            <span className="breakdown-amt">{fmt(d.amt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
