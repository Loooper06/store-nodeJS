const path = require("path");

const {
  deleteFileInPublic,
  listOfImagesFromRequest,
} = require("../../../utils/functions");
const { createProductSchema } = require("../../validators/admin/productSchema");
const { ProductModel } = require("../../../models/products");
const Controller = require("../controller");
const { ObjectValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const productDateBody = await createProductSchema.validateAsync(req.body);

      const supplier = req.user._id;

      let {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        type,
        width,
        height,
        length,
        weight,
        // colors,
        // madein,
        // model,
      } = productDateBody;

      let features = {};

      // features.colors = colors;
      // features.madein = madein;
      // features.model = model;

      if (
        !isNaN(+width) ||
        !isNaN(+height) ||
        !isNaN(+length) ||
        !isNaN(+weight)
      ) {
        if (!width) features.width = 0;
        else features.width = +width;
        if (!height) features.height = 0;
        else features.height = +height;
        if (!length) features.length = 0;
        else features.length = +length;
        if (!weight) features.weight = 0;
        else features.weight = +weight;
      }

      if (type === "فیزیکی") type = "physical";
      else if (type === "مجازی") type = "virtual";

      await ProductModel.create({
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
      // deleteFileInPublic(req.body.image);
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
      const { id } = req.params;
      const product = await this.findProductByID(id);

      const deleteResult = await ProductModel.deleteOne({ _id: product._id });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف با خطا مواجه شد");

      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "حذف محصول با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.find({});

      products.map((pr) => {
        switch (pr.type) {
          case "physical":
            pr.type = "فیزیکی";
            break;

          default:
            pr.type = "مجازی";
            break;
        }
      });

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
      const { id } = req.params;

      const product = await this.findProductByID(id);
      return res.status(200).json({
        statusCode: 200,
        data: {
          product,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findProductByID(productID) {
    const { id } = await ObjectValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);

    switch (product.type) {
      case "physical":
        product.type = "فیزیکی";
        break;

      default:
        product.type = "مجازی";
        break;
    }

    if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
