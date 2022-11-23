import { Schema, model } from "mongoose";
import { schemaOptions } from "./schemaOptions";

interface DocumentResult<T> {
  _doc: T;
}

interface ISection extends DocumentResult<ISection> {
  dashboard: any;
  title: string;
  tasks: any;
}

const SectionSchema = new Schema(
  {
    dashboard: {
      type: Schema.Types.ObjectId,
      ref: "Dashboard",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    tasks: {
      type: Array,
      default: [],
    },
  },
  schemaOptions
);

export default model<ISection>("Section", SectionSchema);
