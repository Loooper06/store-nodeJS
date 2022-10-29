const createHttpError = require("http-errors");
const {
  numberRandomGen,
  SignAccessToken,
  VerifyRefreshToken,
  SignRefreshToken,
} = require("../../../../utils/functions");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/authSchema");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const { ROLES } = require("../../../../utils/constans");
const { StatusCodes: httpStatus } = require("http-status-codes");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = numberRandomGen();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود با شکست مواجه شد");
      return res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
        data: {
          message: "کد اعتبار سنجی با موفقیت ارسال شد",
          code,
          mobile,
        },
      });
    } catch (err) {
      next(createHttpError.BadRequest(err.message));
    }
  }

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createHttpError.NotFound("کاربری یافت نشد");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد");

      const now = new Date().getTime();
      if (user.otp.expiresIn < now)
        throw createHttpError.Unauthorized("کد شما منقضی شده است");

      const accessToken = await SignAccessToken(user._id);
      const refreshToken = await SignRefreshToken(user._id);

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await VerifyRefreshToken(refreshToken);

      const user = await UserModel.findOne({ mobile });
      const accessToken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async saveUser(mobile, code) {
    const now = new Date().getTime();

    let otp = {
      code,
      expiresIn: now + 120000,
    };

    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }

    return !!(await UserModel.create({
      mobile,
      otp,
      Role: ROLES.USER,
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
