const Controller = require("../controller");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      return res.json({res : req.body});
    } catch (err) {
      next(err);
    }
  }

  async editProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async removeProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getAllProducts(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getOneProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
};
