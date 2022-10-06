const { CategoryRoutes } = require("./category");
const router = require("express").Router();

/**
 * @swagger
 *  tags :
 *      name : adminPanel
 *      description : actions of admin (add / edit / remove)
 */

router.use("/category", CategoryRoutes);

module.exports = {
  AdminRoutes: router,
};
