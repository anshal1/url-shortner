const { Schema, model } = require("mongoose");

const Url = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
    },
    long_url: {
      type: String,
      required: true,
    },
    short_url_id: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("urls", Url);
