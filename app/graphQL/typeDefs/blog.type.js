const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCategoryType, UserType } = require("./public.types");

const BlogType = new GraphQLObjectType({
  name: "blogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: UserType },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    image: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: PublicCategoryType },
  },
});

module.exports = {
  BlogType,
};
