import { useMemo } from "react";
import "./BalanceTrendChart.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BalanceTrendChart({ transactions }) {
  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach(({ date, type, amount }) => {
      const [y, m] = date.split("-");
      const key = `${y}-${m}`;
      if (!map[key]) map[key] = { income: 0, expense: 0 };
      if (type === "income") map[key].income += amount;
      else map[key].expense += amount;
    });

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        month: MONTHS[parseInt(key.split("-")[1]) - 1],
        income: val.income,
        expense: val.expense,
        balance: val.income - val.expense,
      }));
  }, [transactions]);

  if (!monthlyData.length) return <div className="chart-empty">No data</div>;

  const maxVal = Math.max(...monthlyData.flatMap(d => [d.income, d.expense]));
  const H = 180, W_BAR = 28, GAP = 16;
  const totalW = monthlyData.length * (W_BAR * 2 + GAP + 12);

  const fmt = (n) => n >= 1000 ? `₹${(n / 1000).toFixed(0)}K` : `₹${n}`;

  return (
    <div className="trend-chart">
      <div className="chart-legend">
        <span className="legend-dot income" />Income
        <span className="legend-dot expense" />Expense
      </div>
      <div className="chart-scroll">
        <svg width={Math.max(totalW, 500)} height={H + 48} className="bar-svg">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map(r => (
            <line key={r} x1={0} x2={totalW} y1={H - r * H} y2={H - r * H}
              stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray="4,4" />
          ))}

          {monthlyData.map((d, i) => {
            const x = i * (W_BAR * 2 + GAP + 12) + 8;
            const incH = maxVal ? (d.income / maxVal) * H : 0;
            const expH = maxVal ? (d.expense / maxVal) * H : 0;

            return (
              <g key={d.month} className="bar-group">
                {/* Income bar */}
                <rect
                  x={x} y={H - incH} width={W_BAR} height={incH}
                  rx={4} className="bar income-bar"
                  data-tooltip={`Income: ${fmt(d.income)}`}
                />
                {/* Expense bar */}
                <rect
                  x={x + W_BAR + 4} y={H - expH} width={W_BAR} height={expH}
                  rx={4} className="bar expense-bar"
                  data-tooltip={`Expense: ${fmt(d.expense)}`}
                />
                {/* Month label */}
                <text x={x + W_BAR + 2} y={H + 18} textAnchor="middle"
                  className="bar-label">{d.month}</text>
                {/* Balance indicator */}
                <text x={x + W_BAR + 2} y={H + 32} textAnchor="middle"
                  className={`balance-label ${d.balance >= 0 ? "pos" : "neg"}`}>
                  {d.balance >= 0 ? "+" : ""}{fmt(d.balance)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
