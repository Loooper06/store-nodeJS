const { RoleModel } = require("../../models/role");
const { PermissionModel } = require("../../models/permission");
const createHttpError = require("http-errors");
const { PERMISSIONS } = require("../../utils/constans");

function checkPermission(requiredPermissions = []) {
  return async function (req, res, next) {
    try {
      const user = req.user;
      const role = await RoleModel.findOne({ title: user.Role });
      const permissions = await PermissionModel.find({
        _id: { $in: role.permissions },
      });
      const userPermissions = permissions.map((item) => item.name);
      const hasPermission = requiredPermissions.every((permission) => {
        return userPermissions.includes(permission);
      });
      
      if (userPermissions.includes(PERMISSIONS.ALL)) return next();
      if (!requiredPermissions.length || hasPermission) return next();
      throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  checkPermission,
};
