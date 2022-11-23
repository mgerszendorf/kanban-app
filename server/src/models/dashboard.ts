import { Schema, model } from "mongoose";
import { schemaOptions } from "./schemaOptions";

interface DocumentResult<T> {
  _doc: T;
}

interface IDashboard extends DocumentResult<IDashboard> {
  user: any;
  icon: string;
  title: string;
  description: string;
  position: number;
  favourite: boolean;
  favouritePosition: number;
  sections: any;
}

const DashboardSchema = new Schema(
  {
    user: {
      type: Object,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
      default: "📃",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    description: {
      type: String,
      default:
        "Please add a description here. If you need it, your description can be multiline",
    },
    position: {
      type: Number,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    favouritePosition: {
      type: Number,
      default: 0,
    },
    sections: {
      type: Array,
      default: [],
    },
  },
  schemaOptions
);

export default model<IDashboard>("Dashboard", DashboardSchema);
