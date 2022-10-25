const path = require("path");

const {
  deleteFileInPublic,
  listOfImagesFromRequest,
  copyObject,
  setFeatures,
  deleteInvalidPropertyObject,
} = require("../../../utils/functions");
const { createProductSchema } = require("../../validators/admin/productSchema");
const { ProductModel } = require("../../../models/products");
const Controller = require("../controller");
const { ObjectValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");

const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LINKS: "links",
  DISLIKES: "disLikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  LENGTH: "length",
  HEIGTH: "height",
  WIDTH: "width",
  COLORS: "colors",
  MODELS: "models",
  MADEIN: "madein",
};
Object.freeze(ProductBlackList);

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
      } = productDateBody;

      let features = setFeatures(req.body);

      if (type === "فیزیکی" || type === "physical") type = "physical";
      else if (type === "مجازی" || type === "virtual") type = "virtual";

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

      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
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
      const { id } = req.params;
      const product = await this.findProductByID(id);

      const data = copyObject(req.body);

      data.images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );

      data.features = setFeatures(req.body);
      let blacklistFields = Object.values(ProductBlackList);
      deleteInvalidPropertyObject(data, blacklistFields);

      const updateProductResult = await ProductModel.updateOne(
        {
          _id: product._id,
        },
        {
          $set: data,
        }
      );

      if (updateProductResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("خطای سرور");

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "بروزرسانی محصول با موفقیت انجام شد",
        },
      });
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

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
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
      const search = req?.query?.search || "";

      let products;
      if (search) {
        products = await ProductModel.find({
          $text: {
            $search: search,
          },
        });
      } else {
        products = await ProductModel.find({});
      }

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

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
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
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
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
