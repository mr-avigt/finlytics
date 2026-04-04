import { useMemo } from "react";
import { useSelector } from "react-redux";
import "./Insights.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Insights() {
  const transactions = useSelector((state) => state.transactions);

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense");
    const income = transactions.filter(t => t.type === "income");

    // Category totals
    const catMap = {};
    expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const catArr = Object.entries(catMap).sort(([, a], [, b]) => b - a);
    const topCategory = catArr[0];

    // Monthly data
    const monthlyMap = {};
    transactions.forEach(({ date, type, amount }) => {
      const key = date.slice(0, 7);
      if (!monthlyMap[key]) monthlyMap[key] = { income: 0, expense: 0 };
      monthlyMap[key][type] += amount;
    });
    const monthlyArr = Object.entries(monthlyMap).sort(([a], [b]) => a.localeCompare(b));

    // Month over month
    const lastTwo = monthlyArr.slice(-2);
    const mom = lastTwo.length === 2
      ? { prev: lastTwo[0], curr: lastTwo[1] }
      : null;

    // Avg monthly spending
    const avgExpense = monthlyArr.length
      ? monthlyArr.reduce((s, [, d]) => s + d.expense, 0) / monthlyArr.length
      : 0;

    // Highest single expense
    const maxExpense = expenses.reduce((m, t) => t.amount > (m?.amount || 0) ? t : m, null);

    // Total income vs expense
    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0;

    return { catArr, topCategory, mom, avgExpense, maxExpense, totalIncome, totalExpense, savingsRate, monthlyArr };
  }, [transactions]);

  const maxCatAmt = insights.catArr[0]?.[1] || 1;

  return (
    <div className="insights-page page">
      {/* Key Insight Cards */}
      <div className="insight-cards">
        <div className="insight-card highlight">
          <div className="insight-icon">🏆</div>
          <div className="insight-content">
            <span className="insight-label">Highest Spending Category</span>
            <span className="insight-value">{insights.topCategory?.[0] || "—"}</span>
            <span className="insight-sub">{insights.topCategory ? fmt(insights.topCategory[1]) + " total" : ""}</span>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">📊</div>
          <div className="insight-content">
            <span className="insight-label">Avg Monthly Expense</span>
            <span className="insight-value">{fmt(Math.round(insights.avgExpense))}</span>
            <span className="insight-sub">per month</span>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon">💸</div>
          <div className="insight-content">
            <span className="insight-label">Biggest Single Expense</span>
            <span className="insight-value">{insights.maxExpense ? fmt(insights.maxExpense.amount) : "—"}</span>
            <span className="insight-sub">{insights.maxExpense?.description}</span>
          </div>
        </div>

        <div className={`insight-card ${insights.savingsRate >= 20 ? "positive" : "warning"}`}>
          <div className="insight-icon">{insights.savingsRate >= 20 ? "✅" : "⚠️"}</div>
          <div className="insight-content">
            <span className="insight-label">Savings Rate</span>
            <span className="insight-value">{insights.savingsRate.toFixed(1)}%</span>
            <span className="insight-sub">{insights.savingsRate >= 20 ? "Excellent!" : "Try to save more"}</span>
          </div>
        </div>
      </div>

      {/* Month-over-Month Comparison */}
      {insights.mom && (
        <div className="section-card">
          <h3 className="section-title">Month-over-Month Comparison</h3>
          <div className="mom-grid">
            {[
              { label: "Income", prev: insights.mom.prev[1].income, curr: insights.mom.curr[1].income },
              { label: "Expenses", prev: insights.mom.prev[1].expense, curr: insights.mom.curr[1].expense },
              { label: "Net", prev: insights.mom.prev[1].income - insights.mom.prev[1].expense, curr: insights.mom.curr[1].income - insights.mom.curr[1].expense },
            ].map(item => {
              const delta = item.prev ? ((item.curr - item.prev) / Math.abs(item.prev) * 100) : 0;
              const up = delta >= 0;
              return (
                <div key={item.label} className="mom-card">
                  <span className="mom-label">{item.label}</span>
                  <span className="mom-prev">{MONTHS[parseInt(insights.mom.prev[0].split("-")[1]) - 1]}: {fmt(item.prev)}</span>
                  <span className="mom-curr">{MONTHS[parseInt(insights.mom.curr[0].split("-")[1]) - 1]}: {fmt(item.curr)}</span>
                  <span className={`mom-delta ${up ? "up" : "down"}`}>
                    {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Breakdown Bars */}
      <div className="section-card">
        <h3 className="section-title gradient-text">
          Spending by Category
        </h3>
        {insights.catArr.length === 0 ? (
          <div className="empty-state"><span>◎</span><p>No expense data</p></div>
        ) : (
          <div className="cat-bars">
            {insights.catArr.map(([cat, amt]) => (
              <div key={cat} className="cat-bar-row">
                <span className="cat-name">{cat}</span>
                <div className="cat-bar-bg">
                  <div
                    className="cat-bar-fill"
                    style={{ width: `${(amt / maxCatAmt) * 100}%` }}
                  />
                </div>
                <span className="cat-bar-amt">{fmt(amt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly Trend Table */}
      <div className="section-card">
        <h3 className="section-title">Monthly Summary</h3>
        <div className="monthly-table-wrap">
          <table className="monthly-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Net</th>
                <th>Savings Rate</th>
              </tr>
            </thead>
            <tbody>
              {insights.monthlyArr.map(([key, val]) => {
                const net = val.income - val.expense;
                const sr = val.income > 0 ? ((net / val.income) * 100).toFixed(1) : "0.0";
                const [, m] = key.split("-");
                return (
                  <tr key={key}>
                    <td>{MONTHS[parseInt(m) - 1]} {key.split("-")[0]}</td>
                    <td className="income">{fmt(val.income)}</td>
                    <td className="expense">{fmt(val.expense)}</td>
                    <td className={net >= 0 ? "income" : "expense"}>{net >= 0 ? "+" : ""}{fmt(net)}</td>
                    <td>
                      <span className={`sr-badge ${+sr >= 20 ? "good" : "warn"}`}>{sr}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
