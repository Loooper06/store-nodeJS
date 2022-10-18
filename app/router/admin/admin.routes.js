const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryAdminApiRoutes } = require("./category");
const { ProductAdminApiRoutes } = require("./product");
const router = require("express").Router();

/**
 * @swagger
 *  tags :
 *      name : adminPanel
 *      description : actions of admin (add / edit / remove)
 */

router.use("/category", CategoryAdminApiRoutes);
router.use("/blogs", BlogAdminApiRoutes);
router.use("/products", ProductAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
