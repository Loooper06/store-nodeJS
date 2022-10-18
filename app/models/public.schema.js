const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  comment: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "comment" },
  createdAt: { type: Date, default: new Date().getTime() },
});

module.exports = {
  CommentSchema,
};
