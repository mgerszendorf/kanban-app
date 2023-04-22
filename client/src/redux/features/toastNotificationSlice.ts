import { createSlice } from "@reduxjs/toolkit";
import { IToastNotification } from "../types";

const initialState = { value: { message: "", type: "" } } as IToastNotification;

export const toastNotificationSlice = createSlice({
  name: "toastNotification",
  initialState,
  reducers: {
    setToastNotification: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setToastNotification } = toastNotificationSlice.actions;

export default toastNotificationSlice.reducer;
