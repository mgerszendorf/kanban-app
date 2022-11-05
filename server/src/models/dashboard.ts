import { Schema, model } from "mongoose";
import { schemaOptions } from "./schemaOptions";

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
  },
  schemaOptions
);

const Dashboard = model("Dashboard", DashboardSchema);
export default Dashboard;
