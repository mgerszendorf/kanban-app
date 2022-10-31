export interface IDashboardResponse {
  description: String;
  favourite: Boolean;
  favouritePosition: Number;
  icon: String;
  id: String;
  position: number;
  title: String;
  user: IDashboardUser;
}

interface IDashboardUser {
  displayName: String;
  email: String;
  uid: String;
}

export interface IDashboardRequest {
  Authorization: String;
}
