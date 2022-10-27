const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
    Courses: { type: [mongoose.Types.ObjectId], default: [], ref: "course" },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.index({
  first_name: "text",
  last_name: "text",
  username: "text",
  mobile: "text",
  email: "text",
});

module.exports = {
  UserModel: mongoose.model("user", UserSchema),
};
