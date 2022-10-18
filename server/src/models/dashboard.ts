const Schema = moongoose.Schema;

const dashboardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "userSchema",
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

module.exports = moongoose.module(dashboardSchema);
