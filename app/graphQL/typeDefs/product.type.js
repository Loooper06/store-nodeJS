const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const {
  PublicCategoryType,
  FeaturesType,
  UserType,
} = require("./public.types");

const productType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    imagesURL: { type: new GraphQLList(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: PublicCategoryType },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    supplier: { type: UserType },
    features: { type: FeaturesType },
  },
});

module.exports = {
  productType,
};
