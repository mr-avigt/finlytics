# 📊 Finlytics — Personal Finance Dashboard

Finlytics is a personal finance dashboard I built using **React 18**, **Redux Toolkit**, and **plain CSS**. The goal was to create something that not only looks clean but actually feels smooth and intuitive to use — whether it's tracking expenses, analysing spending patterns, or just getting a quick financial overview.

It works across desktop, tablet, and mobile, and everything is designed from scratch (including charts — no libraries).

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open: http://localhost:5173

* **Default theme:** Dark mode (you can toggle it from the header)
* **Default role:** Viewer (switch to Admin to enable editing features)

---

## ✨ What this project does

### 📊 Dashboard Overview

This is the main screen — designed to give a quick snapshot of finances.

* **Summary Cards**
  Shows total balance, income, expenses, and savings rate.
  I implemented a custom `useCountUp` hook that animates numbers when they come into view using `IntersectionObserver` + `requestAnimationFrame`. The animation uses an ease-out curve so it feels natural instead of robotic.

* **Balance Trend Chart**
  Built using pure SVG (no chart libraries).
  Transactions are grouped monthly and displayed as income vs expense bars. Heights are calculated dynamically, and the balance is colour-coded (green/red).

* **Spending Breakdown (Donut Chart)**
  Also built manually using SVG + trigonometry (`Math.cos`, `Math.sin`).
  Categories are grouped and displayed as segments with percentages and totals.

* **Recent Transactions**
  Shows the latest 5 transactions with category icons, dates, and colour-coded amounts.

---

### 💳 Transactions Page

This is basically a full transaction manager.

* **Filtering**
  You can filter by:

  * Search (description + category)
  * Type (income/expense)
  * Category
  * Month

  All filters are combined and handled using Redux + `useMemo`.

* **Sorting**
  Click on table headers (Date, Category, Amount) to sort.
  Clicking again toggles ascending/descending.

* **CSV Export**
  Generates and downloads a CSV file of the current filtered data — no external library used.

* **Responsive UI**

  * Desktop → Table view
  * Mobile → Card layout
    Both are rendered together; CSS decides which one to show.

---

### 📈 Insights Page

This section focuses on extracting patterns from the data.

* **Highlight Cards**

  * Highest spending category
  * Average monthly expense
  * Largest expense
  * Savings rate (with indicator)

* **Month-over-Month Comparison**
  Compares the latest two months dynamically and shows % change with visual indicators.

* **Category Breakdown Bars**
  Horizontal bars showing spending per category (animated using CSS).

* **Monthly Summary Table**
  Scrollable table with income, expenses, balance, and savings rate.

---

### 🔐 Role-Based UI

There are two roles:

| Role   | Access                |
| ------ | --------------------- |
| Viewer | Read-only             |
| Admin  | Can add, edit, delete |

* Role is stored in Redux
* Persisted in `localStorage`
* UI updates instantly based on role
* Admin-only features (like modals) are conditionally rendered

---

### 🧠 State Management (Redux Toolkit)

I used Redux Toolkit to keep things structured:

* **transactionsSlice** → Handles all transaction CRUD operations
* **uiSlice** → Manages role + dark mode
* **filtersSlice** → Stores all filter states

There’s also a **custom middleware** that automatically syncs state with `localStorage`.

---

### 🌙 Dark Mode

Implemented using **CSS variables**.

* Theme switching = just changing `data-theme` on `<html>`
* No inline styles or messy toggling
* Entire UI updates instantly

---

### 📱 Responsive Design

The app adapts across screen sizes:

* **Desktop** → Full layout with sidebar
* **Tablet** → Compact layout
* **Mobile** → Sidebar becomes overlay + transactions switch to cards

Sidebar behavior is different on mobile (slides in/out with overlay and auto-closes on navigation).

---

### 🔔 Reload Toast

Every time the app loads, a small toast appears:

* Shows a countdown (3 → 1)
* Has a circular SVG timer animation
* Confirms that data has been restored

---

### 💾 Data Persistence

Everything is stored in `localStorage`:

* Transactions
* Role
* Theme

So refresh doesn’t reset anything.

---

## 🗂️ Project Structure

```bash
src/
├── store/        # Redux slices + middleware
├── hooks/        # Custom hooks for animating the text using js
├── components/   # UI components
├── pages/        # Dashboard, Transactions, Insights pages
├── styles/       # Global css styling
├── App.jsx       # Layout + routing
└── main.jsx      # Entry point
```

---

## 🛠️ Tech Stack

* React 18
* Redux Toolkit
* Vite
* Plain CSS (no framework)
* Custom SVG charts
* localStorage

---

## 📦 Scripts

```bash
npm run dev
npm run build
npm run preview
```

---

## 💡 Why I built this

This project helped me go deeper into:

* SVG + animations
* Performance optimizations
* Responsive UI patterns
* Clean architecture with Redux

---

## 👨‍💻 Author

Abhijeet Anand
B.Tech CSE | Frontend Developer

---
