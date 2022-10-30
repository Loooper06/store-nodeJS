const { GraphQLList } = require("graphql");
const { BlogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async () => {
    const blogs = await BlogModel.find({}).populate([
      { path: "author" },
      { path: "category" },
    ]);
    console.log(blogs);
    return blogs;
  },
};

module.exports = {
  BlogResolver,
};
