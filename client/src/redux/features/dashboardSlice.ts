import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const dashboardSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDashboards: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDashboards } = dashboardSlice.actions;

export default dashboardSlice.reducer;
