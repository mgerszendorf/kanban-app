import { configureStore } from "@reduxjs/toolkit";
import { menuState } from "./reducers/navigationElementsReducer";
import {
  signInState,
  signUpState,
  forgotPasswordState,
} from "./reducers/authenticationPopupsReducer";
import authState from "./reducers/authReducer";
import {
  errorMessageState,
  successMessageState,
} from "./reducers/callingMessageReducer";
import dashboardState from "./features/dashboardSlice";
import guestDashboardState from "./features/guestDashboardSlice";

const store = configureStore({
  reducer: {
    menuState,
    signInState,
    signUpState,
    forgotPasswordState,
    authState,
    errorMessageState,
    successMessageState,
    dashboardState,
    guestDashboardState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
