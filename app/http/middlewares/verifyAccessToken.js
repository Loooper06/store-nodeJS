const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized(
    "حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید"
  );
}

function VerifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        return next(
          createHttpError.Unauthorized("ابتدا وارد حساب کاربری خود شوید")
        );

      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });

      if (!user) throw createHttpError.NotFound("حساب کاربری یافت نشد");
      req.user = user;
      return next();
    });
  } catch (err) {
    next(err);
  }
}

async function VerifyAccessTokenInGraphQL(req, res) {
  try {
    const token = getToken(req.headers);
    try {
      const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

      if (!decodedToken) {
        throw createHttpError.Unauthorized("ابتدا وارد حساب کاربری خود شوید");
      }

      const { mobile } = decodedToken || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });

      if (!user) throw createHttpError.NotFound("حساب کاربری یافت نشد");
      req.user = user;
    } catch (err) {
      throw createHttpError.Unauthorized(err.message);
    }
  } catch (err) {
    throw createHttpError.Unauthorized(err.message);
  }
}

module.exports = {
  VerifyAccessToken,
  VerifyAccessTokenInGraphQL,
};
