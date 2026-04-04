import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../store/transactionsSlice";
import { setFilter, clearFilters } from "../store/filtersSlice";
import TransactionModal from "../components/TransactionModal";
import "./Transactions.css";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineFastfood } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMovie2Line } from "react-icons/ri";
import { RiApps2Line } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa6";
import { TbMountainFilled } from "react-icons/tb";
import { IoBookSharp } from "react-icons/io5";




const CATEGORY_ICONS = {
  "Food & Dining": <MdOutlineFastfood />, "Income": <GiTakeMyMoney />, "Entertainment": <RiMovie2Line />,
  "Utilities": <RiApps2Line />, "Health": <FaUserDoctor />, "Shopping": <FaCartShopping />,
  "Transport": <FaMotorcycle />, "Travel": <TbMountainFilled />, "Education": <IoBookSharp />
};

export default function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const role = useSelector((state) => state.ui.role);
  const filters = useSelector((state) => state.filters);
  const [sort, setSort] = useState({ field: "date", dir: "desc" });
  const [modal, setModal] = useState(null); // null | { mode: "add" | "edit", tx?: obj }

  const categories = useMemo(() => {
    return ["all", ...new Set(transactions.map(t => t.category))];
  }, [transactions]);

  const months = useMemo(() => {
    const m = new Set(transactions.map(t => t.date.slice(0, 7)));
    return ["all", ...[...m].sort().reverse()];
  }, [transactions]);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filters.search) list = list.filter(t =>
      t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.category.toLowerCase().includes(filters.search.toLowerCase())
    );
    if (filters.type !== "all") list = list.filter(t => t.type === filters.type);
    if (filters.category !== "all") list = list.filter(t => t.category === filters.category);
    if (filters.month !== "all") list = list.filter(t => t.date.startsWith(filters.month));

    list.sort((a, b) => {
      let av = a[sort.field], bv = b[sort.field];
      if (sort.field === "amount") { av = +av; bv = +bv; }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [transactions, filters, sort]);

  const toggleSort = (field) => {
    setSort(s => s.field === field ? { ...s, dir: s.dir === "asc" ? "desc" : "asc" } : { field, dir: "desc" });
  };

  const exportCSV = () => {
    const rows = [["Date", "Description", "Category", "Type", "Amount"],
    ...filtered.map(t => [t.date, t.description, t.category, t.type, t.amount])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "transactions.csv";
    a.click();
  };

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const sortIcon = (f) => sort.field === f ? (sort.dir === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="transactions-page page">
      <div className="tx-toolbar">
        <div className="tx-filters">
          <input
            className="filter-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch(setFilter({ key: "search", value: e.target.value }))}
          />
          <select className="filter-select" value={filters.type} onChange={e => dispatch(setFilter({ key: "type", value: e.target.value }))}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="filter-select" value={filters.category} onChange={e => dispatch(setFilter({ key: "category", value: e.target.value }))}>
            {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
          <select className="filter-select" value={filters.month} onChange={e => dispatch(setFilter({ key: "month", value: e.target.value }))}>
            {months.map(m => <option key={m} value={m}>{m === "all" ? "All Months" : m}</option>)}
          </select>
        </div>
        <div className="tx-actions">
          <button className="btn-outline" onClick={exportCSV} title="Export CSV">⬇ Export</button>
          {role === "admin" && (
            <button className="btn-primary" onClick={() => setModal({ mode: "add" })}>+ Add Transaction</button>
          )}
        </div>
      </div>

      <div className="tx-stats-bar">
        <span>{filtered.length} transactions</span>
        <span className="income-sum">Income: {fmt(filtered.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0))}</span>
        <span className="expense-sum">Expenses: {fmt(filtered.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0))}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state large">
          <span className="empty-icon">◎</span>
          <p>No transactions match your filters</p>
          <button className="btn-outline" onClick={() => dispatch(clearFilters())}>
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* ── Desktop Table ── */}
          <div className="tx-table-wrap">
            <table className="tx-table">
              <thead>
                <tr>
                  <th onClick={() => toggleSort("date")} className="sortable">Date{sortIcon("date")}</th>
                  <th>Description</th>
                  <th onClick={() => toggleSort("category")} className="sortable">Category{sortIcon("category")}</th>
                  <th>Type</th>
                  <th onClick={() => toggleSort("amount")} className="sortable">Amount{sortIcon("amount")}</th>
                  {role === "admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx => (
                  <tr key={tx.id} className="tx-row">
                    <td className="tx-date">{fmtDate(tx.date)}</td>
                    <td className="tx-desc">
                      <span className="tx-cat-icon">{CATEGORY_ICONS[tx.category] || "💳"}</span>
                      {tx.description}
                    </td>
                    <td><span className="category-tag">{tx.category}</span></td>
                    <td><span className={`type-badge ${tx.type}`}>{tx.type}</span></td>
                    <td className={`tx-amt ${tx.type}`}>{tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}</td>
                    {role === "admin" && (
                      <td className="action-cell">
                        <button className="icon-btn edit" onClick={() => setModal({ mode: "edit", tx })}>✎</button>
                        <button className="icon-btn delete" onClick={() => { if (confirm("Delete this transaction?")) dispatch(deleteTransaction(tx.id)); }}>✕</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Card List ── */}
          <div className="tx-card-list">
            {filtered.map((tx, i) => (
              <div key={tx.id} className="tx-card" style={{ animationDelay: `${i * 0.03}s` }}>
                <div className="tx-card-icon">{CATEGORY_ICONS[tx.category] || "💳"}</div>
                <div className="tx-card-body">
                  <span className="tx-card-desc">{tx.description}</span>
                  <div className="tx-card-meta">
                    <span className={`type-badge ${tx.type}`}>{tx.type}</span>
                    <span>{tx.category}</span>
                    <span>{fmtDate(tx.date)}</span>
                  </div>
                </div>
                <div className="tx-card-right">
                  <span className={`tx-card-amount ${tx.type}`}>
                    {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                  </span>
                  {role === "admin" && (
                    <div className="tx-card-actions">
                      <button className="icon-btn edit" onClick={() => setModal({ mode: "edit", tx })}>✎</button>
                      <button className="icon-btn delete" onClick={() => { if (confirm("Delete?")) dispatch(deleteTransaction(tx.id)); }}>✕</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {modal && <TransactionModal mode={modal.mode} tx={modal.tx} onClose={() => setModal(null)} />}
    </div>
  );
}
