import { useMemo } from "react";
import { useSelector } from "react-redux";
import SummaryCard from "../components/SummaryCard";
import BalanceTrendChart from "../components/BalanceTrendChart";
import SpendingBreakdown from "../components/SpendingBreakdown";
import RecentTransactions from "../components/RecentTransactions";
import "./Dashboard.css";

export default function Dashboard({ setActivePage }) {
  const transactions = useSelector((state) => state.transactions);

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = income - expenses;
    const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
    return { income, expenses, balance, savingsRate };
  }, [transactions]);

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <SummaryCard
          label="Total Balance"
          value={fmt(stats.balance)}
          sub={`Savings rate: ${stats.savingsRate}%`}
          accent="balance"
          icon="◈"
          trend={stats.balance >= 0 ? "up" : "down"}
        />
        <SummaryCard
          label="Total Income"
          value={fmt(stats.income)}
          sub={`${transactions.filter(t => t.type === "income").length} transactions`}
          accent="income"
          icon="↑"
          trend="up"
        />
        <SummaryCard
          label="Total Expenses"
          value={fmt(stats.expenses)}
          sub={`${transactions.filter(t => t.type === "expense").length} transactions`}
          accent="expense"
          icon="↓"
          trend="down"
        />
        <SummaryCard
          label="Savings Rate"
          value={`${stats.savingsRate}%`}
          sub={stats.savingsRate > 20 ? "Great saving habit!" : "Consider saving more"}
          accent="savings"
          icon="◎"
          trend={stats.savingsRate > 20 ? "up" : "neutral"}
        />
      </div>

      <div className="charts-row">
        <div className="chart-card wide">
          <div className="chart-card-header">
            <h3>Balance Trend</h3>
            <span className="chart-subtitle">Monthly overview</span>
          </div>
          <BalanceTrendChart transactions={transactions} />
        </div>
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Spending Breakdown</h3>
            <span className="chart-subtitle">By category</span>
          </div>
          <SpendingBreakdown transactions={transactions} />
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <button className="link-btn" onClick={() => setActivePage("transactions")}>View All →</button>
        </div>
        <RecentTransactions transactions={transactions.slice(0, 5)} />
      </div>
    </div>
  );
}
