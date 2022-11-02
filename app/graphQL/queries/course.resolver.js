const { GraphQLList, GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../models/courses");
const { CourseType } = require("../typeDefs/course.type");

const CourseResolver = {
  type: new GraphQLList(CourseType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req, res } = context;
    await VerifyAccessTokenInGraphQL(req, res);
    const { category } = args;
    const findQuery = category ? { category } : {};
    return await CourseModel.find(findQuery).populate([
      { path: "teacher" },
      { path: "category" },
    ]);
  },
};

module.exports = {
  CourseResolver,
};
