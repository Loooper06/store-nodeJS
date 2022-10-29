const Controller = require("../../controller");
const { RoleModel } = require("../../../../models/role");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({});

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async createNewRole(req, res, next) {
    try {
      const { title, permissions, description } =
        await addRoleSchema.validateAsync(req.body);
      await this.findRoleByTitle(title);

      const createRoleResult = await RoleModel.create({
        title,
        permissions,
        description,
      });

      if (!createRoleResult)
        throw createHttpError.InternalServerError("نقش ایجاد نشد");

      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "ایجاد نقش با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async removeRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRole(field);

      const removeRoleResult = await RoleModel.deleteOne({ _id: role._id });
      if (!removeRoleResult.deletedCount)
        throw createHttpError.InternalServerError(
          "حذف نقش با خطا مواجه شد (خطای سرور)"
        );

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "حذف نقش با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateRole(req, res, next) {
    try {
      const { roleID } = req.params;
      const data = await addRoleSchema.validateAsync(req.body);
      const role = await this.findRole(roleID);

      const updateResult = await RoleModel.updateOne(
        { _id: role._id },
        { $set: data }
      );

      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "بروز رسانی نقش با خطا مواجه شد (خطای سرور)"
        );
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "بروز رسانی نقش با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findRoleByTitle(title) {
    const role = await RoleModel.findOne({ title });
    if (role) throw createHttpError.BadRequest("نقش مورد نظر قبلا ثبت شده است");
  }

  //? Find Role By ID Or Title
  async findRole(field) {
    let findQuery = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field };

    const role = await RoleModel.findOne(findQuery);
    if (!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");

    return role;
  }
}

module.exports = {
  RoleController: new RoleController(),
};
