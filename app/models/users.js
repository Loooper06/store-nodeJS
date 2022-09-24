const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true, lowercase: true },
  phone: { type: String },
  email: { type: String, lowercase: true },
  discount: { type: Number, default: 0 },
  birth_day: { type: String },
  bills: { type: [], default: [] },
  password: { type: String },
  Roles: { type: [String], default: ["USER"] },
  otp: {
    type: Object,
    default: {
      code: "",
      expires: 0,
    },
  },
});

module.exports = {
  UserModel: mongoose.model("user", Schema),
};
