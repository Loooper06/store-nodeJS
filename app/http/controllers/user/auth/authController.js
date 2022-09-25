const createHttpError = require("http-errors");
const { authSchema } = require("../../../validators/user/authSchema");

class UserAuthController {
  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.status(200).send("ورود موفقیت آمیز بود");
    } catch (err) {
      next(createHttpError.BadRequest(err.message));
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
