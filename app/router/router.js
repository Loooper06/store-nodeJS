const { AdminRoutes } = require("./admin/admin.routes");
const { homeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { userAuthRoutes } = require("./user/auth");

const router = require("express").Router();

router.use("/user", userAuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/", homeRoutes);

module.exports = {
  AllRoutes: router,
};
