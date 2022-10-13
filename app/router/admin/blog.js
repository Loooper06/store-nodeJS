const {
  AdminBlogController,
} = require("../../http/controllers/admin/blogController");

const router = require("express").Router();

//? desc get all blogs list
//? GET /admin/blogs/
router.get("/", AdminBlogController.getListOfBlogs);

//? desc create new blog
//? GET /admin/blogs/add
router.get("/add", AdminBlogController.createBlog);

module.exports = {
  BlogAdminApiRoutes: router,
};
