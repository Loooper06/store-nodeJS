const { GraphQLList } = require("graphql");
const { CategoryModel } = require("../../models/categories");
const {  categoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
  type: new GraphQLList(categoryType),
  resolve: async () => {
    const categories = await CategoryModel.find({ parent: undefined });
    return categories;
  },
};

module.exports = {
  CategoryResolver,
};
