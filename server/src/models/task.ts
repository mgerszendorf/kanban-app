import { Schema, model } from "mongoose";
import { schemaOptions } from "./schemaOptions";

interface DocumentResult<T> {
  _doc: T;
}

interface ITask extends DocumentResult<ITask> {
  section: any;
  title: string;
  content: string;
  position: number;
}

const TaskSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);

export default model<ITask>("Task", TaskSchema);
