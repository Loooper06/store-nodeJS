const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema } = require("../../validators/admin/categorySchema");
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

      const deleteResult = await CategoryModel.deleteOne({ _id: category._id });
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

  editCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  getCategoryByID(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: "" }, { __v: 0 });
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
        { parent },
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
      // const category = await CategoryModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent",
      //       as: "children",
      //     },
      //   },
      //   {
      //     $project: {
      //       __v: 0,
      //     },
      //   },
      // ]);
      
      const category = await CategoryModel.aggregate([
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

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
