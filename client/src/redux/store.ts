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

const store = configureStore({
  reducer: {
    menuState,
    signInState,
    signUpState,
    forgotPasswordState,
    authState,
    errorMessageState,
    successMessageState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
