const { GraphQLList, GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { CategoryModel } = require("../../models/categories");
const { CategoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
  type: new GraphQLList(CategoryType),
  resolve: async (_, args, context) => {
    const { req, res } = context;
    await VerifyAccessTokenInGraphQL(req, res);
    const categories = await CategoryModel.find({ parent: undefined });
    return categories;
  },
};

const CategoryChildResolver = {
  type: new GraphQLList(CategoryType),
  args: {
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { parent } = args;
    const { req, res } = context;
    await VerifyAccessTokenInGraphQL(req, res);
    const categories = await CategoryModel.find({ parent });
    return categories;
  },
};

module.exports = {
  CategoryResolver,
  CategoryChildResolver,
};
