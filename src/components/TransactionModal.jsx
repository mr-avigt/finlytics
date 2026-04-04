import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../store/transactionsSlice";
import "./TransactionModal.css";

const CATEGORIES = ["Food & Dining", "Entertainment", "Utilities", "Health", "Shopping", "Transport", "Travel", "Education", "Income", "Other"];

export default function TransactionModal({ mode, tx, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(tx || {
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "Food & Dining",
    type: "expense",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = "Enter a valid amount";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const data = { ...form, amount: +form.amount };
    if (mode === "add") dispatch(addTransaction(data));
    else dispatch(editTransaction({ id: tx.id, updated: data }));
    onClose();
  };

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: undefined }));
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-header">
          <h2>{mode === "add" ? "Add Transaction" : "Edit Transaction"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>Date
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          </label>
          <label>Description
            <input
              type="text"
              placeholder="e.g. Grocery Store"
              value={form.description}
              onChange={e => set("description", e.target.value)}
              className={errors.description ? "error" : ""}
            />
            {errors.description && <span className="err-msg">{errors.description}</span>}
          </label>
          <div className="form-row">
            <label>Type
              <select value={form.type} onChange={e => set("type", e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
            <label>Category
              <select value={form.category} onChange={e => set("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <label>Amount (₹)
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.amount}
              onChange={e => set("amount", e.target.value)}
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && <span className="err-msg">{errors.amount}</span>}
          </label>
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {mode === "add" ? "Add Transaction" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
