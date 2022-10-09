export interface Store {
  menuState: boolean;
  signInState: boolean;
  signUpState: boolean;
  forgotPasswordState: boolean;
  authState: IAuthState;
  errorMessageState: boolean;
  successMessageState: boolean;
}

export interface IAuthState {
  authMsg: string;
  user: IUser;
}

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  refreshToken: string;
}
