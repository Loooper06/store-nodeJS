const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../../../models/courses");
const Controller = require("../../controller");
const { CourseController } = require("./courseController");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");

class ChapterController extends Controller {
  async addNewChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;

      await CourseController.findCourseByID(id);
      const saveChapterResult = await CourseModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );

      if (saveChapterResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "افزودن فصل با مشکل مواجه شد (خطای سرور)"
        );

      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "افزودن فصل به دوره با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getChapters(req, res, next) {
    try {
      const { courseID } = req.params;
      const course = await this.getChaptersOfCourse(courseID);

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

  async getChaptersOfCourse(id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");

    const chapters = await CourseModel.findOne(
      { _id: id },
      { chapters: 1, title: 1 }
    );

    if (!chapters) createHttpError.NotFound("دوره ای یافت نشد");
    return chapters;
  }

  async getOneChapter(id) {
    const chapter = await CourseModel.findOne(
      { "chapters._id": id },
      { "chapters.$": 1 }
    );
    if (!chapter) throw createHttpError.NotFound("فصلی با این شناسه یافت نشد");

    return chapter;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
