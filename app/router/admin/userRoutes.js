const {
  UserController,
} = require("../../http/controllers/admin/user/userController");

const router = require("express").Router();

//? desc get all users list
//? GET /admin/users/list
router.get("/list", UserController.getAllUsers);

//? desc update user profile
//? PATCH /admin/users/update-profile
router.patch("/update-profile", UserController.updateUserProfile);

module.exports = {
  UserAdminApiRoutes: router,
};
