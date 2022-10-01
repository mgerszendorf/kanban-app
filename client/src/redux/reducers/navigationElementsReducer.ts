import { ActionTypes } from "../actions/navigationElementsAction";

export const menuState = (state = false, action: ActionTypes) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return !state;

    default:
      return state;
  }
};

export const sidebarSlidingElementState = (
  state = false,
  action: ActionTypes
) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR_SLIDING_ELEMENT":
      return !state;

    case "SHOW_SIDEBAR_SLIDING_ELEMENT":
      return true;

    case "HIDE_SIDEBAR_SLIDING_ELEMENT":
      return false;

    default:
      return state;
  }
};
