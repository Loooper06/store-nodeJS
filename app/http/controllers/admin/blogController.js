const Controller = require("../controller");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getOneBlogByID(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  //!Done
  async getListOfBlogs(req, res, next) {
    try {
      return res.status(200).json({
        statusCode: 200,
        data: {
          blogs: [],
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteBlogByID(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateBlogByID(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
