import { createSlice } from "@reduxjs/toolkit";
import { IDashboards } from "../types";

const initialState = { value: [] } as IDashboards;

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboards: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDashboards } = dashboardSlice.actions;

export default dashboardSlice.reducer;
