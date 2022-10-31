const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoryResolver } = require("./queries/category.resolver");
const { ProductResolver } = require("./queries/product.resolver");

//? query , mutation , schema , types

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
  },
});

const RootMutaion = new GraphQLObjectType({
  name: "RootMutation",
  fields: {},
});

const graphql_Schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutaion,
});

module.exports = {
  graphql_Schema,
};
