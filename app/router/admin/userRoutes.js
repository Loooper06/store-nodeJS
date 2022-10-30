const {
  UserController,
} = require("../../http/controllers/admin/user/userController");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");

const router = require("express").Router();

//? desc get all users list
//? GET /admin/users/list
router.get(
  "/list",
  checkPermission([PERMISSIONS.ADMIN]),
  UserController.getAllUsers
);

//? desc update user profile
//? PATCH /admin/users/update-profile
router.patch("/update-profile", UserController.updateUserProfile);

//? desc get user profile
//? GET /admin/users/profile
router.get("/profile", checkPermission([]), UserController.userProfile);

module.exports = {
  UserAdminApiRoutes: router,
};
