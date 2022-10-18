const taskSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "sectionSchema",
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

module.exports = mongoose.model(taskSchema);
