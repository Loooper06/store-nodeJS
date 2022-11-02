const { GraphQLList, GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    await VerifyAccessTokenInGraphQL(req);
    const { category } = args;
    const findQuery = category ? { category } : {};
    return await BlogModel.find(findQuery).populate([
      { path: "author" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
  },
};

module.exports = {
  BlogResolver,
};
