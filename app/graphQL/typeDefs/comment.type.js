const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./public.types");

const CommentAnswerType = new GraphQLObjectType({
  name: "CommentAnswerType",
  fields: {
    user: { type: UserType },
    comment: { type: GraphQLString },
    show: { type: GraphQLBoolean },
  },
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: {
    user: { type: UserType },
    comment: { type: GraphQLString },
    answers: { type: new GraphQLList(CommentAnswerType) },
    show: { type: GraphQLBoolean },
    openToComment: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  },
});

module.exports = {
  CommentType,
};
