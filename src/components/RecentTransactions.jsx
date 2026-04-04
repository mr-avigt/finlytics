import "./RecentTransactions.css";

const CATEGORY_ICONS = {
  "Food & Dining": "🍽",
  "Income": "💰",
  "Entertainment": "🎬",
  "Utilities": "⚡",
  "Health": "🏥",
  "Shopping": "🛍",
  "Transport": "🚗",
  "Travel": "✈",
  "Education": "📚",
};

export default function RecentTransactions({ transactions }) {
  const fmt = (n) => "₹" + n.toLocaleString("en-IN");
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

  if (!transactions.length) return (
    <div className="empty-state">
      <span>◎</span>
      <p>No transactions yet</p>
    </div>
  );

  return (
    <div className="recent-list">
      {transactions.map(tx => (
        <div key={tx.id} className="recent-item">
          <div className="tx-icon">{CATEGORY_ICONS[tx.category] || "💳"}</div>
          <div className="tx-info">
            <span className="tx-desc">{tx.description}</span>
            <span className="tx-meta">{tx.category} · {fmtDate(tx.date)}</span>
          </div>
          <span className={`tx-amount ${tx.type}`}>
            {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}
