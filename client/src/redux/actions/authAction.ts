import { GoogleAuthProvider } from "firebase/auth";
import firebase from "../../services/firebase";
import { IUser } from "../types";
import {
  hideForgotPassword,
  hideSignIn,
  hideSignUp,
} from "./authenticationPopupsAction";
import {
  hideErrorMessage,
  hideSuccessMessage,
  showErrorMessage,
  showSuccessMessage,
} from "./callingMessageAction";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNIN_SUCCESS_GOOGLE = "SIGNIN_SUCCESS_GOOGLE";
export const SIGNIN_ERROR_GOOGLE = "SIGNIN_ERROR_GOOGLE";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_ERROR = "RESET_ERROR";
// export const USER = "USER";

export type AuthActionTypes =
  | { type: typeof SIGNUP_SUCCESS; payload: { message: string; user: IUser } }
  | { type: typeof SIGNUP_ERROR; payload: string }
  | { type: typeof SIGNIN_SUCCESS; payload: { message: string; user: IUser } }
  | { type: typeof SIGNIN_ERROR; payload: string }
  | { type: typeof SIGNOUT_SUCCESS; payload: { message: string; user: IUser } }
  | { type: typeof SIGNOUT_ERROR; payload: string }
  | { type: typeof RESET_SUCCESS; payload: string }
  | { type: typeof RESET_ERROR; payload: string };

// Signing up with Firebase
export const signup =
  (email: string, password: string, name: string) => async (dispatch: any) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((dataBeforeEmail) => {
          firebase.auth().onAuthStateChanged(function (user: any) {
            user.sendEmailVerification();
            user.updateProfile({
              displayName: name,
            });

            dispatch({
              type: SIGNUP_SUCCESS,
              payload: {
                message: "Your account was successfully created!",
                user: {
                  displayName: user?.displayName,
                  email: user?.email,
                  uid: user?.uid,
                  refreshToken: user?.refreshToken,
                },
              },
            });
            dispatch(hideSignUp());
            dispatch(hideSignIn());
            dispatch(hideForgotPassword());
            dispatch(showSuccessMessage());
            setTimeout(() => {
              dispatch(hideSuccessMessage());
            }, 2000);
          });
        })
        .catch(function (error) {
          dispatch({
            type: SIGNUP_ERROR,
            payload: {
              message:
                "Something went wrong, we couldn't create your account. Please try again.",
            },
          });
          dispatch(showErrorMessage());
          setTimeout(() => {
            dispatch(hideErrorMessage());
          }, 2000);
        });
    } catch (err) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: {
          message:
            "Something went wrong, we couldn't create your account. Please try again.",
        },
      });
      dispatch(showErrorMessage());
      setTimeout(() => {
        dispatch(hideErrorMessage());
      }, 2000);
    }
  };

// Signing in with Firebase
export const signin =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: {
              message: "Logged in successfully",
              user: {
                displayName: res?.user?.displayName,
                email: res?.user?.email,
                uid: res?.user?.uid,
                refreshToken: res?.user?.refreshToken,
              },
            },
          });
          dispatch(hideSignUp());
          dispatch(hideSignIn());
          dispatch(hideForgotPassword());
          dispatch(showSuccessMessage());
          setTimeout(() => {
            dispatch(hideSuccessMessage());
          }, 2000);
        })
        .catch(() => {
          dispatch({
            type: SIGNIN_ERROR,
            payload: {
              message: "Invalid login credentials",
            },
          });
          dispatch(showErrorMessage());
          setTimeout(() => {
            dispatch(hideErrorMessage());
          }, 2000);
        });
    } catch (err) {
      dispatch({
        type: SIGNIN_ERROR,
        payload: {
          message: "Invalid login credentials",
        },
      });
      dispatch(showErrorMessage());
      setTimeout(() => {
        dispatch(hideErrorMessage());
      }, 2000);
    }
  };

// Signing in with Google
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => async (dispatch: any) => {
  try {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: SIGNIN_SUCCESS_GOOGLE,
          payload: {
            message: "Logged in successfully",
            user: {
              displayName: res?.user?.displayName,
              email: res?.user?.email,
              uid: res?.user?.uid,
              refreshToken: res?.user?.refreshToken,
            },
          },
        });
        dispatch(showSuccessMessage());
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, 2000);
      });
  } catch (err) {
    dispatch({
      type: SIGNIN_ERROR_GOOGLE,
      payload: {
        message: "Invalid login credentials",
      },
    });
    dispatch(showErrorMessage());
    setTimeout(() => {
      dispatch(hideErrorMessage());
    }, 2000);
  }
};

// Signing out with Firebase
export const signout = () => async (dispatch: any) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: SIGNOUT_SUCCESS,
          payload: { message: "Logged out successfully", user: {} },
        });
        dispatch(showSuccessMessage());
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, 2000);
      })
      .catch(() => {
        dispatch({
          type: SIGNOUT_ERROR,
          payload: {
            message: "Signout failed. Please try again",
          },
        });
        dispatch(showErrorMessage());
        setTimeout(() => {
          dispatch(hideErrorMessage());
        }, 2000);
      });
  } catch (err) {
    dispatch({
      type: SIGNOUT_ERROR,
      payload: {
        message: "Signout failed. Please try again",
      },
    });
    dispatch(showErrorMessage());
    setTimeout(() => {
      dispatch(hideErrorMessage());
    }, 2000);
  }
};

// Reset password with Firebase
export const resetPassword = (email: string) => async (dispatch: any) => {
  try {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: RESET_SUCCESS,
          payload: {
            message: "Reset email sent. Go check your inbox.",
          },
        });
        dispatch(hideSignUp());
        dispatch(hideSignIn());
        dispatch(hideForgotPassword());
        dispatch(showSuccessMessage());
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, 2000);
      })
      .catch((err) => {
        dispatch({
          type: RESET_ERROR,
          payload: {
            message: "Password reset failed. Please try again",
          },
        });
        dispatch(showErrorMessage());
        setTimeout(() => {
          dispatch(hideErrorMessage());
        }, 2000);
      });
  } catch (err) {
    dispatch({
      type: RESET_ERROR,
      payload: {
        message: "Password reset failed. Please try again",
      },
    });
    dispatch(showErrorMessage());
    setTimeout(() => {
      dispatch(hideErrorMessage());
    }, 2000);
  }
};
