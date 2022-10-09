import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  RESET_SUCCESS,
  RESET_ERROR,
  SIGNIN_ERROR_GOOGLE,
  SIGNIN_SUCCESS_GOOGLE,
} from "../actions/authAction";

const INITIAL_STATE = {
  authMsg: "",
  user: null,
};

export default function authState(state = INITIAL_STATE, action: any) {
  if (
    action.type === SIGNUP_SUCCESS ||
    action.type === SIGNIN_SUCCESS ||
    action.type === SIGNIN_SUCCESS_GOOGLE ||
    action.type === SIGNOUT_SUCCESS ||
    action.type === SIGNUP_ERROR ||
    action.type === SIGNIN_ERROR ||
    action.type === SIGNIN_ERROR_GOOGLE ||
    action.type === SIGNOUT_ERROR ||
    action.type === RESET_SUCCESS ||
    action.type === RESET_ERROR
  ) {
    return {
      ...state,
      authMsg: action.payload.message,
      user: action.payload.user,
    };
  } else {
    return state;
  }
}
