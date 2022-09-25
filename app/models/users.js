const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, lowercase: true },
  mobile: { type: String, required: true },
  email: { type: String, lowercase: true },
  discount: { type: Number, default: 0 },
  birth_day: { type: String },
  bills: { type: [], default: [] },
  password: { type: String },
  Roles: { type: [String], default: ["USER"] },
  otp: {
    type: Object,
    default: {
      code: 0,
      expiresIn: 0,
    },
  },
});

module.exports = {
  UserModel: mongoose.model("user", Schema),
};
