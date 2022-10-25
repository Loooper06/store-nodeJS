const { CourseModel } = require("../../../models/courses");
const Controller = require("../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const path = require("path");
const { createCourseSchema } = require("../../validators/admin/courseSchema");
const createHttpError = require("http-errors");
const { deleteFileInPublic } = require("../../../utils/functions");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses;

      if (search) {
        courses = await CourseModel.find({ $text: { $search: search } }).sort({
          _id: -1,
        });
      } else courses = await CourseModel.find({}).sort({ _id: -1 });

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          courses,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getCourseByID(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);

      if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          course,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async addNewCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);

      const { filename, fileUploadPath } = req.body;
      const teacher = req.user._id;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      let { title, short_text, text, tags, category, price, discount, type } =
        req.body;

      switch (type) {
        case "رایگان":
          type = "free";
          break;
        case "پولی":
          type = "cash";
          break;

        default:
          type = "permium";
          break;
      }

      if (Number(price) > 0 && type == "free") {
        throw createHttpError.BadRequest(
          "برای دوره رایگان نمی توان قیمت درج کرد"
        );
      }

      if (Number(price) == 0 && type == "cash") {
        throw createHttpError.BadRequest("قیمت  دوره پولی نمی تواند 0 درج شود");
      }

      const course = await CourseModel.create({
        title,
        short_text,
        text,
        tags,
        category,
        price,
        discount,
        type,
        image,
        time: "00:00:00",
        teacher,
      });

      if (!course?._id) {
        throw createHttpError.InternalServerError("دوره ثبت نشد (خطای سرور)");
      }
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        message: "افزودن دوره با موفقیت انجام شد",
      });
    } catch (err) {
      deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename));
      next(err);
    }
  }

  async addNewChapter(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async addNewEpisode(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteCourse(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateCourse(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
