const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Episodes = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});

const Chapter = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [Episodes], default: [] },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  deslike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  status: { type: String, default: "notStarted" }, //! notStarted - Completed - Holding
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: { type: String, required: true }, //! free - cash - permium
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  chapters: { type: [Chapter], default: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});

CourseSchema.index({ title: "text", text: "text", short_text: "text" });

module.exports = {
  CourseModel: mongoose.model("course", CourseSchema),
};
