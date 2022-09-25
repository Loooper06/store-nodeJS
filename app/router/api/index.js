const homeController = require("../../http/controllers/api/homeController");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name : indexPage
 *  description : index page route and data
 */

/**
 * @swagger
 * /:
 *  get:
 *    summary: index route
 *    tags : [indexPage]
 *    description: get all need data in index page
 *    responses:
 *      200:
 *        description : success
 *      404:
 *        description : not found
 */

router.get("/", homeController.indexPage);

module.exports = {
  homeRoutes: router,
};
