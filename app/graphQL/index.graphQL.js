const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");

//? query , mutation , schema , types

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
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
