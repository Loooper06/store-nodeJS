const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { UserType } = require("./public.types");

const ParentOfCommentType = new GraphQLObjectType({
  name: "ParentOfCommentType",
  fields: {
    user: { type: UserType },
    comment: { type: GraphQLString },
  },
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: {
    user: { type: UserType },
    comment: { type: GraphQLString },
    parent: { type: ParentOfCommentType },
    show: { type: GraphQLBoolean },
    openToComment: { type: GraphQLBoolean },
  },
});

module.exports = {
  CommentType,
};
