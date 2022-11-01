const { GraphQLList } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req, res } = context;
    await VerifyAccessTokenInGraphQL(req, res);
    return await BlogModel.find({}).populate([
      { path: "author" },
      { path: "category" },
    ]);
  },
};

module.exports = {
  BlogResolver,
};
