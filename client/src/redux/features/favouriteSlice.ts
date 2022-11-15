import { createSlice } from "@reduxjs/toolkit";
import { IDashboards } from "../types";

const initialState = { value: [] } as IDashboards;

export const favouriteSlice = createSlice({
  name: "favouriteList",
  initialState,
  reducers: {
    setFavouriteList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavouriteList } = favouriteSlice.actions;

export default favouriteSlice.reducer;
