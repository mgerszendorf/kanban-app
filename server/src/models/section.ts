import { Schema, model } from "mongoose";
import { schemaOptions } from "./schemaOptions";

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

const Section = model("Section", SectionSchema);
export default Section;
