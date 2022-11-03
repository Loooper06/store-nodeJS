const { GraphQLList } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs");
const { CourseModel } = require("../../models/courses");
const { ProductModel } = require("../../models/products");
const { BlogType } = require("../typeDefs/blog.type");
const { CourseType } = require("../typeDefs/course.type");
const { productType } = require("../typeDefs/product.type");

const getUserBookmarkedBlogs = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const blogs = await BlogModel.find({ bookmarks: user._id }).populate([
      { path: "author" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return blogs;
  },
};

const getUserBookmarkedCourses = {
  type: new GraphQLList(CourseType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const courses = await CourseModel.find({ bookmarks: user._id }).populate([
      { path: "teacher" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return courses;
  },
};

const getUserBookmarkedProducts = {
  type: new GraphQLList(productType),
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const products = await ProductModel.find({ bookmarks: user._id }).populate([
      { path: "category" },
      { path: "supplier" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
    return products;
  },
};

module.exports = {
  getUserBookmarkedBlogs,
  getUserBookmarkedCourses,
  getUserBookmarkedProducts,
};
