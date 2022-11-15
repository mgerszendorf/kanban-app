import { ISection } from "./ISections";

export interface ITaskRequest {
  Authorization: String;
}

export interface ITask {
  content: string;
  id: string;
  position: number;
  section: ISection;
  title: string;
  _id: string;
}
