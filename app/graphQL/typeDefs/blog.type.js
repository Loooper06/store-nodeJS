const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { CommentType } = require("./comment.type");
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
    comments: { type: new GraphQLList(CommentType) },
    likes: { type: UserType },
    dislikes: { type: UserType },
    bookmarks: { type: UserType },
  },
});

module.exports = {
  BlogType,
};
