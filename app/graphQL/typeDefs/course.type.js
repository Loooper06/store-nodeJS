const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { UserType, AnyType } = require("./public.types");

const EpisodeType = new GraphQLObjectType({
  name: "EpisodeType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    type: { type: GraphQLString },
    time: { type: GraphQLString },
    videoAddress: { type: GraphQLString },
    videoURL: { type: GraphQLString },
  },
});

const ChapterType = new GraphQLObjectType({
  name: "ChapterType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    episodes: { type: new GraphQLList(EpisodeType) },
  },
});

const CourseType = new GraphQLObjectType({
  name: "CourseType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    image: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: AnyType },
    status: { type: GraphQLString }, //! notStarted - Completed - Holding
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    type: { type: GraphQLString }, //! free - cash - permium
    teacher: { type: UserType },
    chapters: { type: new GraphQLList(ChapterType) },
  },
});

module.exports = {
  CourseType,
  ChapterType,
  EpisodeType,
};
