import { ActionTypes } from "../actions/navigationElementsAction";

export const menuState = (state = false, action: ActionTypes) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return !state;

    default:
      return state;
  }
};
