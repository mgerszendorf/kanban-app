import { createSlice } from "@reduxjs/toolkit";
import { INavigationElement } from "../types";

const initialState = { active: false } as INavigationElement;

export const navigationElementSlice = createSlice({
  name: "navElement",
  initialState,
  reducers: {
    setNavigationElement: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setNavigationElement } = navigationElementSlice.actions;

export default navigationElementSlice.reducer;
