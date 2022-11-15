import { ITask } from "./ITasks";

export interface ISectionRequest {
  Authorization: String;
}

export interface ISection {
  dashboard: string;
  id: string;
  tasks: ITask[];
  title: string;
  _id: string;
}
