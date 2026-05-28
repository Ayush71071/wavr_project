import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    activeNav: "home",
    sidebarOpen: true,
    searchQuery: "",
  },
  reducers: {
    setActiveNav(state, action) { state.activeNav = action.payload; },
    toggleSidebar(state) { state.sidebarOpen = !state.sidebarOpen; },
    setSearchQuery(state, action) { state.searchQuery = action.payload; },
  },
});

export const { setActiveNav, toggleSidebar, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
