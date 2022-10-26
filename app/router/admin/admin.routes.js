const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryAdminApiRoutes } = require("./category");
const { ChapterAdminApiRoutes } = require("./chapter");
const { CourseAdminApiRoutes } = require("./course");
const { EpisodeAdminApiRoutes } = require("./episode");
const { ProductAdminApiRoutes } = require("./product");
const router = require("express").Router();

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);
router.use("/courses", CourseAdminApiRoutes);
router.use("/chapters", ChapterAdminApiRoutes);
router.use("/episodes", EpisodeAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
