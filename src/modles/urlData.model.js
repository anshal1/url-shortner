const { Schema, model } = require("mongoose");
const paginate = require("../plugins/paginate.plugin");

const Url = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
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

Url.plugin(paginate);

module.exports = model("urls", Url);
