const { GraphQLString, GraphQLObjectType, GraphQLList } = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

const FeaturesType = new GraphQLObjectType({
  name: "FeaturesType",
  fields: {
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    width: { type: GraphQLString },
    width: { type: GraphQLString },
    weight: { type: GraphQLString },
    colors: { type: new GraphQLList(GraphQLString) },
    models: { type: new GraphQLList(GraphQLString) },
    madein: { type: GraphQLString },
  },
});

module.exports = {
  AuthorType,
  FeaturesType,
  CategoryType,
};
