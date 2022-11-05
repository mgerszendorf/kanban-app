import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../types";

const initialState = { value: {} } as IAuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
