const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { AuthorType, CategoryType } = require("./public.types");

const productType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: CategoryType },
    price: { type: GraphQLString },
    discount: { type: GraphQLString },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    //todo supplier: { type:  },
    features: {
      type: Object,
      default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madein: "",
      },
    },
  },
});

module.exports = {
  productType,
};
