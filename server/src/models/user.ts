import { Schema, model } from "mongoose";
import { schemaOptions } from "./schemaOptions";

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  schemaOptions
);

const User = model("User", UserSchema);
export default User;
