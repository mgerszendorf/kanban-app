import { CallingMessageTypes } from "../actions/callingMessageAction";

export const errorMessageState = (
  state = false,
  action: CallingMessageTypes
) => {
  switch (action.type) {
    case "SHOW_ERROR_MESSAGE":
      return true;

    case "HIDE_ERROR_MESSAGE":
      return false;

    default:
      return state;
  }
};

export const successMessageState = (
  state = false,
  action: CallingMessageTypes
) => {
  switch (action.type) {
    case "SHOW_SUCCESS_MESSAGE":
      return true;

    case "HIDE_SUCCESS_MESSAGE":
      return false;

    default:
      return state;
  }
};
