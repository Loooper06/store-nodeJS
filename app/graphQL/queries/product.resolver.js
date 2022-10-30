const { GraphQLList } = require("graphql");
const { ProductModel } = require("../../models/products");
const { productType } = require("../typeDefs/product.type");

const ProductResolver = {
  type: new GraphQLList(productType),
  resolve: () => {
    return ProductModel.find({});
  },
};

module.exports = {
  ProductResolver,
};
