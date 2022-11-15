import { configureStore } from "@reduxjs/toolkit";
import dashboardState from "./features/dashboardSlice";
import messageState from "./features/messageSlice";
import navigationElementState from "./features/navigationElementSlice";
import authState from "./features/authSlice";
import favouriteListState from "./features/favouriteSlice";

const store = configureStore({
  reducer: {
    dashboardState,
    messageState,
    navigationElementState,
    authState,
    favouriteListState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
