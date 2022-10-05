const redisClient = require("../utils/init_redis");
const { homeRoutes } = require("./api");
const { userAuthRoutes } = require("./user/auth");

const router = require("express").Router();

router.use("/user", userAuthRoutes);
router.use("/", homeRoutes);

module.exports = {
  AllRoutes: router,
};
