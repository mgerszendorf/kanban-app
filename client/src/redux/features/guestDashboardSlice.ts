import { createSlice } from "@reduxjs/toolkit";

interface IGuestDashboardArr {
  value: IGuestDashboard[];
}

interface IGuestDashboard {
  description: String;
  icon: String;
  title: String;
  user: String;
}

const initialState = { value: [] } as IGuestDashboardArr;

export const guestDashboardSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuestDashboards: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setGuestDashboards } = guestDashboardSlice.actions;

export default guestDashboardSlice.reducer;
