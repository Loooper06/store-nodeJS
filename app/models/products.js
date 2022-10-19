const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  short_text: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  deslike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, required: true }, //! virtual - physici
  supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  features: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "",
      colors: [],
      model: [],
      madein: "",
    },
  },
});

module.exports = {
  ProductModel: mongoose.model("product", Schema),
};
