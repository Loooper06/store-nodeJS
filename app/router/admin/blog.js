const {
  AdminBlogController,
} = require("../../http/controllers/admin/blogController");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

//? desc get all blogs list
//? GET /admin/blogs/
router.get("/list", AdminBlogController.getListOfBlogs);

//? desc get blog by id
//? GET /admin/blogs/:id
router.get("/:id", AdminBlogController.getOneBlogById);

//? desc create new blog
//? GET /admin/blogs/add
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  VerifyAccessToken,
  AdminBlogController.createBlog
);

//? desc get a blog by blog's ID
//? GET /admin/blogs/:id
router.get("/:id", AdminBlogController.getOneBlogById);

//? desc update blog
//? PATCH /admin/blogs/:id
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  VerifyAccessToken,
  AdminBlogController.updateBlogById
);

//? desc delete blog
//? DELETE /admin/blogs/:id
router.delete("/:id", VerifyAccessToken, AdminBlogController.deleteBlogById);

module.exports = {
  BlogAdminApiRoutes: router,
};
