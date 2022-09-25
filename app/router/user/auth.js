const {
  UserAuthController,
} = require("../../http/controllers/user/auth/authController");

const router = require("express").Router();
//! Swagger
/**
 * @swagger
 * tags:
 *  name : user authorization
 *  description : user-auth section
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: login user with OTP
 *    description: one time password
 *    tags: [user authorization]
 *    parameters:
 *    - name : mobile
 *      description : fa-IR phone number
 *      in : formData
 *      required : true
 *      schema:
 *        type : string
 *    responses:
 *      201:
 *        description : success
 *      400:
 *        description : bad request
 *      401:
 *        description : unAuthorization
 *      500:
 *        description : Internal Server Error
 */

router.post("/login", UserAuthController.login);

module.exports = {
  userAuthRoutes: router,
};
