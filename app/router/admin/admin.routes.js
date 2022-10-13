const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const router = require("express").Router();

/**
 * @swagger
 *  tags :
 *      name : adminPanel
 *      description : actions of admin (add / edit / remove)
 */

router.use("/category", CategoryRoutes);
router.use("/blogs", BlogAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
