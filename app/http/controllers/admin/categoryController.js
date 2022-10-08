const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CategoryModel } = require("../../../models/categories");
const {
  addCategorySchema,
  editCategorySchema,
} = require("../../validators/admin/categorySchema");
const Controller = require("../controller");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      await CategoryModel.create({ title, parent });

      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت افزوده شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);

      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);

      await editCategorySchema.validateAsync(req.body);
      const updateResult = await CategoryModel.updateOne(
        { _id: id },
        { $set: { title } }
      );

      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("بروز رسانی انجام نشد");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "بروز رسانی دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getCategoryByID(req, res, next) {
    try {
      const { id: _id } = req.params;

      const category = await CategoryModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
          },
        },
      ]);

      return res.status(200).json({
        data: {
          statusCode: 200,
          category,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find(
        { parent: undefined },
        { __v: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          parents,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find(
        { parent: mongoose.Types.ObjectId(parent) },
        { __v: 0, parent: 0 }
      );

      return res.status(200).json({
        data: {
          statusCode: 200,
          children,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      // const categories = await CategoryModel.aggregate([
      //   {
      //     $graphLookup: {
      //       from: "categories",
      //       startWith: "$_id",
      //       connectFromField: "_id",
      //       connectToField: "parent",
      //       maxDepth: 5,
      //       depthField: "depth",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //       "children.__v": 0,
      //       "children.parent": 0,
      //     },
      //   },
      //   {
      //     $match: {
      //       parent: undefined,
      //     },
      //   },
      // ]);

      const categories = await CategoryModel.find();
      console.log(categories);

      return res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllCategoryWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoryModel.aggregate([
        {
          $match: {},
        },
      ]);

      return res.status(200).json({
        data: {
          statusCode: 200,
          categories,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
