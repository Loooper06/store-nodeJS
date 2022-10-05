const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

function VerifyAccessToken(req, res, next) {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader)
      return next(
        createHttpError.Unauthorized(
          "ابتدا ثبت نام یا وارد حساب کاربری خود شوید"
        )
      );

    const token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
        if (err)
          return next(
            createHttpError.Unauthorized("ابتدا وارد حساب کاربری خود شوید")
          );

        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );

        if (!user)
          return next(createHttpError.NotFound("حساب کاربری یافت نشد"));

        req.user = user;
        return next();
      });
    } else
      return next(
        createHttpError.Unauthorized("ابتدا وارد حساب کاربری خود شوید")
      );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  VerifyAccessToken,
};
