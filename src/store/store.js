import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import uiReducer from "./uiSlice";
import filtersReducer from "./filtersSlice";

// Middleware to persist state changes to localStorage
const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();

  if (action.type.startsWith("transactions/")) {
    localStorage.setItem("finance_transactions", JSON.stringify(state.transactions));
  }
  if (action.type.startsWith("ui/")) {
    localStorage.setItem("finance_role", state.ui.role);
    localStorage.setItem("finance_dark", state.ui.darkMode);
    document.documentElement.setAttribute("data-theme", state.ui.darkMode ? "dark" : "light");
  }

  return result;
};

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    ui: uiReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

// Apply saved dark mode on initial load
const savedDark = localStorage.getItem("finance_dark") === "true";
document.documentElement.setAttribute("data-theme", savedDark ? "dark" : "light");

export default store;
