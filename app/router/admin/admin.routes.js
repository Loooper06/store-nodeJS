const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");
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

router.use(
  "/category",
  checkPermission([PERMISSIONS.CONTENT_MANAGER]),
  CategoryAdminApiRoutes
);

router.use(
  "/blogs",
  checkPermission([PERMISSIONS.TEACHER]),
  BlogAdminApiRoutes
);

router.use(
  "/products",
  checkPermission([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]),
  ProductAdminApiRoutes
);

router.use(
  "/courses",
  checkPermission([PERMISSIONS.TEACHER]),
  CourseAdminApiRoutes
);

router.use(
  "/chapters",
  checkPermission([PERMISSIONS.TEACHER]),
  ChapterAdminApiRoutes
);

router.use(
  "/episodes",
  checkPermission([PERMISSIONS.TEACHER]),
  EpisodeAdminApiRoutes
);

router.use("/users", UserAdminApiRoutes);

router.use(
  "/permissions",
  checkPermission([PERMISSIONS.ADMIN]),
  PermissionAdminApiRoutes
);

router.use("/roles", checkPermission(PERMISSIONS.ADMIN), RoleAdminApiRoutes);

// router.use(
//   "/transactions",
//   checkPermission(PERMISSIONS.ADMIN),
//   AdminApiTransactionRouter
// );

module.exports = {
  AdminRoutes: router,
};
