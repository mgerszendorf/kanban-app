export const SHOW_SIGN_IN = "SHOW_SIGN_IN";
export const HIDE_SIGN_IN = "HIDE_SIGN_IN";
export const SHOW_SIGN_UP = "SHOW_SIGN_UP";
export const HIDE_SIGN_UP = "HIDE_SIGN_UP";
export const SHOW_FORGOT_PASSWORD = "SHOW_FORGOT_PASSWORD";
export const HIDE_FORGOT_PASSWORD = "HIDE_FORGOT_PASSWORD";

export type AuthenticationPopupsActionTypes =
  | { type: typeof SHOW_SIGN_IN }
  | { type: typeof HIDE_SIGN_IN }
  | { type: typeof SHOW_SIGN_UP }
  | { type: typeof HIDE_SIGN_UP }
  | { type: typeof SHOW_FORGOT_PASSWORD }
  | { type: typeof HIDE_FORGOT_PASSWORD };

// SIGN IN
export const showSignIn = (): AuthenticationPopupsActionTypes => ({
  type: SHOW_SIGN_IN,
});

export const hideSignIn = (): AuthenticationPopupsActionTypes => ({
  type: HIDE_SIGN_IN,
});

// SIGN UP
export const showSignUp = (): AuthenticationPopupsActionTypes => ({
  type: SHOW_SIGN_UP,
});

export const hideSignUp = (): AuthenticationPopupsActionTypes => ({
  type: HIDE_SIGN_UP,
});

// FORGOT PASSWORD
export const showForgotPassword = (): AuthenticationPopupsActionTypes => ({
  type: SHOW_FORGOT_PASSWORD,
});

export const hideForgotPassword = (): AuthenticationPopupsActionTypes => ({
  type: HIDE_FORGOT_PASSWORD,
});
