const { GraphQLList, GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { productType } = require("../typeDefs/product.type");

const ProductResolver = {
  type: new GraphQLList(productType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    await VerifyAccessTokenInGraphQL(req);
    const { category } = args;
    const findQuery = category ? { category } : {};
    return await ProductModel.find(findQuery).populate([
      { path: "category" },
      { path: "supplier" },
    ]);
  },
};

module.exports = {
  ProductResolver,
};
