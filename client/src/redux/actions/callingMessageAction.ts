export const SHOW_ERROR_MESSAGE = "SHOW_ERROR_MESSAGE";
export const HIDE_ERROR_MESSAGE = "HIDE_ERROR_MESSAGE";
export const SHOW_SUCCESS_MESSAGE = "SHOW_SUCCESS_MESSAGE";
export const HIDE_SUCCESS_MESSAGE = "HIDE_SUCCESS_MESSAGE";

export type CallingMessageTypes =
  | { type: typeof SHOW_ERROR_MESSAGE }
  | { type: typeof HIDE_ERROR_MESSAGE }
  | { type: typeof SHOW_SUCCESS_MESSAGE }
  | { type: typeof HIDE_SUCCESS_MESSAGE };

// Error message
export const showErrorMessage = (): CallingMessageTypes => ({
  type: SHOW_ERROR_MESSAGE,
});

export const hideErrorMessage = (): CallingMessageTypes => ({
  type: HIDE_ERROR_MESSAGE,
});

// Success message
export const showSuccessMessage = (): CallingMessageTypes => ({
  type: SHOW_SUCCESS_MESSAGE,
});

export const hideSuccessMessage = (): CallingMessageTypes => ({
  type: HIDE_SUCCESS_MESSAGE,
});
