const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryAdminApiRoutes } = require("./category");
const { CourseAdminApiRoutes } = require("./course");
const { ProductAdminApiRoutes } = require("./product");
const router = require("express").Router();

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);
router.use("/courses", CourseAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
