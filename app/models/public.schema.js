const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: "boolean", required: true, default: false },
  },
  { timestamps: { createdAt: true } }
);

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: "boolean", required: true, default: false },
    openToComment: { type: "boolean", default: true },
    answers: { type: [AnswerSchema], default: [] },
  },
  { timestamps: { createdAt: true } }
);

module.exports = {
  CommentSchema,
};
