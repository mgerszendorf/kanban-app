export interface Store {
  dashboardState: IDashboards;
  toastNotificationState: IToastNotification;
  navigationElementState: INavigationElement;
  authState: IAuthState;
  favouriteListState: IDashboards;
}

//Dashboards
export interface IDashboards {
  value: IDashboard[];
}

export interface IDashboard {
  description: String;
  favourite: Boolean;
  favouritePosition: Number;
  icon: String;
  id: String;
  position: number;
  title: String;
  user: IDashboardUser;
}

export interface IDashboardUser {
  displayName: String;
  email: String;
  uid: String;
}

// Message
export interface IToastNotification {
  value: {
    message: String;
    type: String;
  };
}

//Navigation element
export interface INavigationElement {
  active: Boolean;
}

//User
export interface IAuthState {
  value: {
    message: String;
    user: IUser;
  };
}

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  refreshToken: string;
}
