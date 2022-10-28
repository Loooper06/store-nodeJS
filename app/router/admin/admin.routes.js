const { BlogAdminApiRoutes } = require("./blog");
const { CategoryAdminApiRoutes } = require("./category");
const { ChapterAdminApiRoutes } = require("./chapter");
const { CourseAdminApiRoutes } = require("./course");
const { EpisodeAdminApiRoutes } = require("./episode");
const { PermissionAdminApiRoutes } = require("./permission");
const { ProductAdminApiRoutes } = require("./product");
const { RoleAdminApiRoutes } = require("./role");
const { UserAdminApiRoutes } = require("./userRoutes");
const router = require("express").Router();

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/users", UserAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);
router.use("/courses", CourseAdminApiRoutes);
router.use("/chapters", ChapterAdminApiRoutes);
router.use("/episodes", EpisodeAdminApiRoutes);
router.use("/roles", RoleAdminApiRoutes);
router.use("/permissions", PermissionAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
