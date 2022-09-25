const {
  UserAuthController,
} = require("../../http/controllers/user/auth/authController");

const router = require("express").Router();

router.post("/login", UserAuthController.login);

module.exports = {
  userAuthRoutes: router,
};
