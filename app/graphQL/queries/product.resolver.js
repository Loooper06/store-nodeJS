const { GraphQLList } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { ProductModel } = require("../../models/products");
const { productType } = require("../typeDefs/product.type");

const ProductResolver = {
  type: new GraphQLList(productType),
  resolve: async (_, args, context) => {
    const { req, res } = context;
    await VerifyAccessTokenInGraphQL(req, res);
    return await ProductModel.find({}).populate([
      { path: "category" },
      { path: "supplier" },
    ]);
  },
};

module.exports = {
  ProductResolver,
};
