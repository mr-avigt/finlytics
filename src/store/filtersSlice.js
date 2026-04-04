import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    type: "all",
    category: "all",
    month: "all",
  },
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => ({
      search: "",
      type: "all",
      category: "all",
      month: "all",
    }),
  },
});

export const { setFilter, setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
