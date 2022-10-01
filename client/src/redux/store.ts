import { configureStore } from "@reduxjs/toolkit";
import {
  menuState,
  sidebarSlidingElementState,
} from "./reducers/navigationElementsReducer";

const store = configureStore({
  reducer: {
    menuState,
    sidebarSlidingElementState,
  },
});

export default store;
