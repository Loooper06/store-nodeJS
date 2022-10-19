const path = require("path");

const {
  deleteFileInPublic,
  listOfImagesFromRequest,
} = require("../../../utils/functions");
const { createProductSchema } = require("../../validators/admin/productSchema");
const { ProductModel } = require("../../../models/products");
const Controller = require("../controller");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const productDateBody = await createProductSchema.validateAsync(req.body);

      const supplier = req.user._id;

      const {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        width,
        height,
        length,
        weight,
      } = productDateBody;

      let features = {};
      let type = "physical";

      if (width || height || length || weight) {
        if (!width) features.width = 0;
        else features.width = width;
        if (!height) features.height = 0;
        else features.height = height;
        if (!length) features.length = 0;
        else features.length = length;
        if (!weight) features.weight = 0;
        else features.weight = weight;
      } else {
        type = "virtual";
      }

      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        type,
        count,
        price,
        discount,
        supplier,
        images,
        features,
      });

      return res.status(200).json({
        statusCode: 201,
        data: {
          message: "ثبت محصول با موفقیت انجام شد",
        },
      });
    } catch (err) {
      deleteFileInPublic(req.body.image);
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
      const products = await ProductModel.find({});

      return res.status(200).json({
        statusCode: 200,
        data: {
          products,
        },
      });
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
