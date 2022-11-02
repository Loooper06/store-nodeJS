const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: "boolean", required: true, default: false },
    openToComment: { type: "boolean", default: true },
    parent: { type: mongoose.Types.ObjectId, ref: "comment" },
  },
  { timestamps: { createdAt: true } }
);

module.exports = {
  CommentSchema,
};
