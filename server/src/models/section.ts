const mongoose = require("mongoose");

const sectionSchema = new Schema(
  {
    dashboard: {
      type: Schema.Types.ObjectId,
      ref: "dashboardSchema",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  schemaOptions
);

module.exports = mongoose.model(sectionSchema);
