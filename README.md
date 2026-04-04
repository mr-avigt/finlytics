# Finlens — Finance Dashboard UI

A clean, production-grade personal finance dashboard built with React and CSS.

## Features

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses, Savings Rate), bar chart (monthly balance trend), donut chart (spending breakdown by category)
- **Transactions** — Full list with search, filter by type/category/month, sort by date/amount/category, CSV export
- **Insights** — Top spending category, month-over-month comparison, category breakdown bars, monthly summary table
- **Role-Based UI** — Viewer (read-only) vs Admin (add, edit, delete transactions) — switchable via dropdown
- **Dark Mode** — Full dark theme toggle
- **Data Persistence** — localStorage saves transactions, role, and theme preference
- **Responsive** — Mobile-friendly layout with collapsible sidebar

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React 18 (hooks, context API)
- Plain CSS with CSS variables (design tokens)
- Vite
- Custom SVG charts (no chart library dependency)

## Repository Name Ideas

### Clean & Professional
- `finlens` — the app name, short and memorable
- `finance-dashboard-ui`
- `personal-finance-tracker`
- `cashflow-dashboard`

### Descriptive
- `react-finance-dashboard`
- `finance-tracker-react`
- `spending-insights-ui`

### Creative
- `moneylens`
- `ledger-ui`
- `pocketview`
- `rupee-radar`
- `flowboard-finance`

## Project Structure

```
src/
├── context/
│   └── FinanceContext.jsx    # Global state (transactions, role, theme, filters)
├── components/
│   ├── Sidebar.jsx / .css
│   ├── Header.jsx / .css
│   ├── SummaryCard.jsx / .css
│   ├── BalanceTrendChart.jsx / .css
│   ├── SpendingBreakdown.jsx / .css
│   ├── RecentTransactions.jsx / .css
│   └── TransactionModal.jsx / .css
├── pages/
│   ├── Dashboard.jsx / .css
│   ├── Transactions.jsx / .css
│   └── Insights.jsx / .css
├── App.jsx / App.css
└── main.jsx
```
