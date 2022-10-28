const Controller = require("../../controller");
const { PermissionModel } = require("../../../../models/permission");
const { StatusCodes: httpStatus } = require("http-status-codes");
const {
  addPermissionSchema,
} = require("../../../validators/admin/RBAC.schema");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");

class PermissionController extends Controller {
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionModel.find({});

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          permissions,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async createNewPermission(req, res, next) {
    try {
      const { name, description } = await addPermissionSchema.validateAsync(
        req.body
      );
      await this.findPermissionByName(name);

      const permission = await PermissionModel.create({ name, description });
      if (!permission)
        throw createHttpError.InternalServerError(
          "ایجاد سطح دسترسی با خطا مواجه شد (خطای سرور)"
        );

      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "ایجاد سطح دسترسی با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async removePermission(req, res, next) {
    try {
      const { permissionID } = req.params;
      const permission = await this.findPermissionByID(permissionID);

      const permissionRemoveResult = await PermissionModel.deleteOne({
        _id: permission._id,
      });

      if (!permissionRemoveResult.deletedCount)
        throw createHttpError.InternalServerError(
          "حذف سطح دسترسی با خطا مواجه شد (خطای سرور)"
        );

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "حذف سطح دسترسی با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findPermissionByName(name) {
    const permission = await PermissionModel.findOne({ name });
    if (permission)
      throw createHttpError.BadRequest("سطح دسترسی قبلا ثبت شده است");
  }

  async findPermissionByID(ID) {
    if (!mongoose.isValidObjectId(ID))
      throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");

    const permission = await PermissionModel.findOne({ _id: ID });
    if (!permission) throw createHttpError.NotFound("سطح دسترسی یافت نشد");

    return permission;
  }
}

module.exports = {
  PermissionController: new PermissionController(),
};
