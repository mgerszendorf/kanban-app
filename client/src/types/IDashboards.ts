import { ISection } from "./ISections";

export interface IDashboardRequest {
  Authorization: String;
}

export interface IDashboardResponse {
  dashboard: IDashboard;
  sections: ISection[];
}

export interface IDashboard {
  description: String;
  favourite: Boolean;
  favouritePosition: Number;
  icon: String;
  id: String;
  position: number;
  title: String;
  user: {
    displayName: String;
    email: String;
    uid: String;
  };
}
