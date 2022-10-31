const { GraphQLList } = require("graphql");
const { ProductModel } = require("../../models/products");
const { productType } = require("../typeDefs/product.type");

const ProductResolver = {
  type: new GraphQLList(productType),
  resolve: () => {
    return ProductModel.find({}).populate([{path : "category"} , {path : "supplier"}]);
  },
};

module.exports = {
  ProductResolver,
};
