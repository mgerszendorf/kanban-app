import { configureStore } from "@reduxjs/toolkit";
import dashboardState from "./features/dashboardSlice";
import messageState from "./features/messageSlice";
import navigationElementState from "./features/navigationElementSlice";
import authState from "./features/authSlice";

const store = configureStore({
  reducer: {
    dashboardState,
    messageState,
    navigationElementState,
    authState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
