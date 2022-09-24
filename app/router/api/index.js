const homeController = require("../../http/controllers/api/homeController");

const router = require("express").Router();

router.get("/", homeController.indexPage);

module.exports = {
  homeRoutes: router,
};
