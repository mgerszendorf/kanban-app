const moongoose = require("mongoose");
const { schemaOptions } = require("./schemaOptions");

exports.schemaOptions = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamp: true,
};
