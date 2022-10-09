import { AuthenticationPopupsActionTypes } from "../actions/authenticationPopupsAction";

export const signInState = (
  state = false,
  action: AuthenticationPopupsActionTypes
) => {
  switch (action.type) {
    case "SHOW_SIGN_IN":
      return true;

    case "HIDE_SIGN_IN":
      return false;

    default:
      return state;
  }
};

export const signUpState = (
  state = false,
  action: AuthenticationPopupsActionTypes
) => {
  switch (action.type) {
    case "SHOW_SIGN_UP":
      return true;

    case "HIDE_SIGN_UP":
      return false;

    default:
      return state;
  }
};

export const forgotPasswordState = (
  state = false,
  action: AuthenticationPopupsActionTypes
) => {
  switch (action.type) {
    case "SHOW_FORGOT_PASSWORD":
      return true;

    case "HIDE_FORGOT_PASSWORD":
      return false;

    default:
      return state;
  }
};
