const { CourseModel } = require("../../../../models/courses");
const Controller = require("../../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const path = require("path");
const {
  createCourseSchema,
} = require("../../../validators/admin/courseSchema");
const createHttpError = require("http-errors");
const {
  deleteFileInPublic,
  copyObject,
  deleteInvalidPropertyObject,
  getTimeOfCourse,
} = require("../../../../utils/functions");
const { default: mongoose } = require("mongoose");

class CourseController extends Controller {
  async getAllCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses;

      if (search) {
        courses = await CourseModel.find({ $text: { $search: search } })
          .populate([
            { path: "category", select: { title: 1 } },
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
            },
          ])
          .sort({
            _id: -1,
          });
      } else
        courses = await CourseModel.find({})
          .populate([
            { path: "category", select: { children: -1, parent: -1 } },
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, mobile: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });

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
      const course = await this.findCourseByID(id);
      course.time = getTimeOfCourse(course.chapters);

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
        case "????????????":
          type = "free";
          break;
        case "????????":
          type = "cash";
          break;

        default:
          type = "permium";
          break;
      }

      if (Number(price) > 0 && type == "free") {
        throw createHttpError.BadRequest(
          "???????? ???????? ???????????? ?????? ???????? ???????? ?????? ??????"
        );
      }

      if (Number(price) == 0 && type == "cash") {
        throw createHttpError.BadRequest("????????  ???????? ???????? ?????? ?????????? 0 ?????? ??????");
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
        teacher,
      });

      if (!course?._id) {
        throw createHttpError.InternalServerError("???????? ?????? ?????? (???????? ????????)");
      }
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        message: "???????????? ???????? ???? ???????????? ?????????? ????",
      });
    } catch (err) {
      deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename));
      next(err);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const { courseID } = req.params;
      const course = await this.findCourseByID(courseID);

      let blackListField = [
        "time",
        "chapters",
        "episodes",
        "students",
        "bookmarks",
        "likes",
        "dislikes",
        "comments",
        "fileUploadPath",
        "filename",
      ];

      const { filename, fileUploadPath } = req.body;
      const data = copyObject(req.body);
      deleteInvalidPropertyObject(data, blackListField);

      if (req.file) {
        data.image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
        deleteFileInPublic(course.image);
      }

      const updateCourseResult = await CourseModel.updateOne(
        { _id: courseID },
        {
          $set: data,
        }
      );

      if (!updateCourseResult.modifiedCount)
        throw createHttpError.InternalServerError(
          "???????? ?????????? ???????? ???? ?????? ?????????? ???? (???????? ????????)"
        );

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "???????? ?????????? ???????? ???? ???????????? ?????????? ????",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async findCourseByID(id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("?????????? ?????????? ?????? ???????? ?????? ????????");
    const course = await CourseModel.findById(id);

    if (!course) createHttpError.NotFound("???????? ???? ???????? ??????");
    return course;
  }
}

module.exports = {
  CourseController: new CourseController(),
};
