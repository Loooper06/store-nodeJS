const { graphqlHTTP } = require("express-graphql");
const { VerifyAccessToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { homeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { userAuthRoutes } = require("./user/auth");
const { graphqlConfig } = require("../utils/graphql.config");

const router = require("express").Router();

router.use("/user", userAuthRoutes);
router.use("/admin", VerifyAccessToken, AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/", homeRoutes);

module.exports = {
  AllRoutes: router,
};
