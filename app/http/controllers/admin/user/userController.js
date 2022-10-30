const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { deleteInvalidPropertyObject } = require("../../../../utils/functions");
const createHttpError = require("http-errors");

class UserController extends Controller {
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;
      const DBquery = {};

      if (search) DBquery["$text"] = { $search: search };
      const users = await UserModel.find(DBquery);

      return res.status(httpStatus.OK).json({
        StatusCode: httpStatus.OK,
        data: {
          users,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUserProfile(req, res, next) {
    try {
      const userID = req.user._id;
      const data = req.body;

      let blackListFields = [
        "mobile",
        "otp",
        "bills",
        "discount",
        "Roles",
        "Courses",
      ];
      deleteInvalidPropertyObject(data, blackListFields);

      const updateUserResult = await UserModel.updateOne(
        { _id: userID },
        { $set: data }
      );

      if (!updateUserResult)
        throw createHttpError.InternalServerError(
          "بروز رسانی با خطا مواجه شد (خطای سرور)"
        );

      return res.status(httpStatus.OK).json({
        StatusCode: httpStatus.OK,
        data: {
          message: "بروز رسانی پروفایل با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async userProfile(req, res, next) {
    try {
      const user = req.user;

      return res.status(httpStatus.OK).json({
        StatusCode: httpStatus.OK,
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
