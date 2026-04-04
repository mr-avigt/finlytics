import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    role: localStorage.getItem("finance_role") || "viewer",
    darkMode: localStorage.getItem("finance_dark") === "true",
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setRole, setDarkMode, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
