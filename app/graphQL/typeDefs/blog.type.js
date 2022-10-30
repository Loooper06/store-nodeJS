const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType, CategoryType } = require("./public.types");

const BlogType = new GraphQLObjectType({
  name: "blogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: AuthorType },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    image: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: CategoryType },
  },
});

module.exports = {
  BlogType,
};
