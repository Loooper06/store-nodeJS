const { GraphQLList } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../models/courses");
const { CourseType } = require("../typeDefs/course.type");

const CourseResolver = {
  type: new GraphQLList(CourseType),
  resolve: async (_, args, context) => {
    const { req, res } = context;
    await VerifyAccessTokenInGraphQL(req, res);
    return await CourseModel.find({}).populate([
      { path: "teacher" },
      { path: "category" },
    ]);
  },
};

module.exports = {
  CourseResolver,
};
