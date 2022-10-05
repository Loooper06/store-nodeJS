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
 * /user/get-otp:
 *  post:
 *    summary: get otp code
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

//* desc Get one time password
//* POST /user/get-otp
router.post("/get-otp", UserAuthController.getOtp);

//! Swagger
/**
 * @swagger
 * /user/check-otp:
 *  post:
 *    summary: check otp value
 *    description: one time password
 *    tags: [user authorization]
 *    parameters:
 *    - name : mobile
 *      description : fa-IR phone number
 *      in : formData
 *      required : true
 *      schema:
 *        type : string
 *    - name : code
 *      description : enter sms OTP code
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

//* desc Get one time password
//* POST /user/check-otp
router.post("/check-otp", UserAuthController.checkOtp);

//! Swagger
//! Swagger
/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *    summary: send refresh token for get new token and refresh token
 *    description: fresh token
 *    tags: [user authorization]
 *    parameters:
 *    - name : refreshToken
 *      in : body
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

//* desc refresh access
//* POST /user/refresh-token
router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
  userAuthRoutes: router,
};
