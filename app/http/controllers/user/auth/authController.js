const createHttpError = require("http-errors");
const { numberRandomGen } = require("../../../../utils/functions");
const { authSchema } = require("../../../validators/user/authSchema");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");

class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = numberRandomGen();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود با شکست مواجه شد");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبار سنجی با موفقیت ارسال شد",
          code,
          mobile,
        },
      });
    } catch (err) {
      next(createHttpError.BadRequest(err.message));
    }
  }

  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };

    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }

    return !!(await UserModel.create({
      mobile,
      otp,
      Roles: [USER_ROLE],
    }));
  }

  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });

    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );

    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
