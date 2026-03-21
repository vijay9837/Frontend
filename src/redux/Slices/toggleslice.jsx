import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: true,
  reducers: {
    sidenavtoggle: (state) => {
      return !state;
    },
    opensidenav: () => {
      return true;
    },
    closesidenav: () => {
      return false;
    },
  },
});

export const { sidenavtoggle, opensidenav, closesidenav } = toggleSlice.actions;
export default toggleSlice.reducer;