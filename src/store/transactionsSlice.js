import { createSlice } from "@reduxjs/toolkit";

const INITIAL_TRANSACTIONS = [
  { id: 1, date: "2025-01-05", description: "Salary Deposit", category: "Income", type: "income", amount: 85000 },
  { id: 2, date: "2025-01-07", description: "Grocery Store", category: "Food & Dining", type: "expense", amount: 3200 },
  { id: 3, date: "2025-01-10", description: "Netflix Subscription", category: "Entertainment", type: "expense", amount: 649 },
  { id: 4, date: "2025-01-12", description: "Electricity Bill", category: "Utilities", type: "expense", amount: 2100 },
  { id: 5, date: "2025-01-15", description: "Freelance Project", category: "Income", type: "income", amount: 25000 },
  { id: 6, date: "2025-01-18", description: "Restaurant Dinner", category: "Food & Dining", type: "expense", amount: 1800 },
  { id: 7, date: "2025-01-20", description: "Gym Membership", category: "Health", type: "expense", amount: 1500 },
  { id: 8, date: "2025-01-22", description: "Online Shopping", category: "Shopping", type: "expense", amount: 4500 },
  { id: 9, date: "2025-01-25", description: "Internet Bill", category: "Utilities", type: "expense", amount: 999 },
  { id: 10, date: "2025-01-28", description: "Fuel", category: "Transport", type: "expense", amount: 2800 },
  { id: 11, date: "2025-02-05", description: "Salary Deposit", category: "Income", type: "income", amount: 85000 },
  { id: 12, date: "2025-02-07", description: "Grocery Store", category: "Food & Dining", type: "expense", amount: 2900 },
  { id: 13, date: "2025-02-10", description: "Spotify", category: "Entertainment", type: "expense", amount: 119 },
  { id: 14, date: "2025-02-12", description: "Doctor Visit", category: "Health", type: "expense", amount: 800 },
  { id: 15, date: "2025-02-14", description: "Valentine's Dinner", category: "Food & Dining", type: "expense", amount: 3500 },
  { id: 16, date: "2025-02-18", description: "Electricity Bill", category: "Utilities", type: "expense", amount: 1950 },
  { id: 17, date: "2025-02-20", description: "Consulting Fee", category: "Income", type: "income", amount: 18000 },
  { id: 18, date: "2025-02-22", description: "Uber Rides", category: "Transport", type: "expense", amount: 1200 },
  { id: 19, date: "2025-02-25", description: "Online Course", category: "Education", type: "expense", amount: 4999 },
  { id: 20, date: "2025-02-27", description: "Pharmacy", category: "Health", type: "expense", amount: 650 },
  { id: 21, date: "2025-03-05", description: "Salary Deposit", category: "Income", type: "income", amount: 85000 },
  { id: 22, date: "2025-03-07", description: "Grocery Store", category: "Food & Dining", type: "expense", amount: 3100 },
  { id: 23, date: "2025-03-10", description: "Amazon Shopping", category: "Shopping", type: "expense", amount: 6200 },
  { id: 24, date: "2025-03-12", description: "Mobile Recharge", category: "Utilities", type: "expense", amount: 599 },
  { id: 25, date: "2025-03-15", description: "Side Business Revenue", category: "Income", type: "income", amount: 32000 },
  { id: 26, date: "2025-03-18", description: "Flight Tickets", category: "Travel", type: "expense", amount: 12000 },
  { id: 27, date: "2025-03-20", description: "Hotel Booking", category: "Travel", type: "expense", amount: 8500 },
  { id: 28, date: "2025-03-22", description: "Fuel", category: "Transport", type: "expense", amount: 2600 },
  { id: 29, date: "2025-03-25", description: "Electricity Bill", category: "Utilities", type: "expense", amount: 2250 },
  { id: 30, date: "2025-03-28", description: "Gym Membership", category: "Health", type: "expense", amount: 1500 },
  { id: 31, date: "2025-04-05", description: "Salary Deposit", category: "Income", type: "income", amount: 90000 },
  { id: 32, date: "2025-04-07", description: "Grocery Store", category: "Food & Dining", type: "expense", amount: 2750 },
  { id: 33, date: "2025-04-10", description: "Netflix Subscription", category: "Entertainment", type: "expense", amount: 649 },
  { id: 34, date: "2025-04-12", description: "Car Service", category: "Transport", type: "expense", amount: 3500 },
  { id: 35, date: "2025-04-15", description: "Freelance Project", category: "Income", type: "income", amount: 40000 },
  { id: 36, date: "2025-04-18", description: "Restaurant Lunch", category: "Food & Dining", type: "expense", amount: 1200 },
  { id: 37, date: "2025-04-20", description: "Electricity Bill", category: "Utilities", type: "expense", amount: 2000 },
  { id: 38, date: "2025-04-22", description: "Bookstore", category: "Education", type: "expense", amount: 1800 },
  { id: 39, date: "2025-04-25", description: "Internet Bill", category: "Utilities", type: "expense", amount: 999 },
  { id: 40, date: "2025-04-28", description: "Clothes Shopping", category: "Shopping", type: "expense", amount: 5500 },
];

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("finance_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: loadFromStorage(),
  reducers: {
    addTransaction: (state, action) => {
      const newTx = { ...action.payload, id: Date.now() };
      state.unshift(newTx);
    },
    editTransaction: (state, action) => {
      const { id, updated } = action.payload;
      const idx = state.findIndex((t) => t.id === id);
      if (idx !== -1) state[idx] = { ...state[idx], ...updated };
    },
    deleteTransaction: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    resetTransactions: () => INITIAL_TRANSACTIONS,
  },
});

export const { addTransaction, editTransaction, deleteTransaction, resetTransactions } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
