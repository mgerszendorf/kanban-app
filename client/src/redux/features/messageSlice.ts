import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../types";

const initialState = { value: { message: "", type: "" } } as IMessage;

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
