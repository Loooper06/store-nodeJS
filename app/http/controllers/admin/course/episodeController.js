const {
  createEpisodeSchema,
} = require("../../../validators/admin/courseSchema");
const Controller = require("../../controller");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const path = require("path");
const {
  getTime,
  deleteInvalidPropertyObject,
  copyObject,
} = require("../../../../utils/functions");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/courses");
const createHttpError = require("http-errors");
const { ObjectValidator } = require("../../../validators/public.validator");

class EpisodeController extends Controller {
  async addNewEpisode(req, res, next) {
    try {
      const {
        title,
        text,
        type,
        chapterID,
        courseID,
        filename,
        fileUploadPath,
      } = await createEpisodeSchema.validateAsync(req.body);

      const videoAddress = path
        .join(fileUploadPath, filename)
        .replace(/\\/gi, "/");

        console.log(videoAddress);

      const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;

      const seconds = await getVideoDurationInSeconds(videoUrl);
      const time = getTime(seconds);

      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };

      const createEpisodeResult = await CourseModel.updateOne(
        {
          _id: courseID,
          "chapters._id": chapterID,
        },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );

      if (createEpisodeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "افزودن قسمت با خطا مواجه شد (خطای سرور )"
        );

      return res.status(httpStatus.CREATED).json({
        StatusCode: httpStatus.CREATED,
        data: {
          message: "افزودن قسمت با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async removeEpisode(req, res, next) {
    try {
      const { id: episodeID } = await ObjectValidator.validateAsync({
        id: req.params.episodeID,
      });

      const removeEpisodeResult = await CourseModel.updateOne(
        {
          "chapters.episodes._id": episodeID,
        },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeID,
            },
          },
        }
      );

      if (removeEpisodeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "حذف قسمت با خطا مواجه شد (خطای سرور)"
        );

      return res.status(httpStatus.OK).json({
        StatusCode: httpStatus.OK,
        data: {
          message: "حذف قسمت با موفقیت انجام شد",
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateEpisodeByID(req, res, next) {
    try {
      const { episodeID } = req.params;
      const episode = await this.getOneEpisode(episodeID);
      const { filename, fileUploadPath } = req.body;

      let blackListFields = ["_id"];
      if (filename && fileUploadPath) {
        const fileAddress = path.join(fileUploadPath, filename);
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
        const seconds = await getVideoDurationInSeconds(videoURL);
        req.body.time = getTime(seconds);
        blackListFields.push("filename");
        blackListFields.push("fileUploadPath");
      } else {
        blackListFields.push("time");
        blackListFields.push("videoAddress");
      }

      const data = req.body;
      deleteInvalidPropertyObject(data, blackListFields);

      const newEpisode = {
        ...episode,
        ...data,
      };

      const editEpisodeResult = await CourseModel.updateOne(
        {
          "chapters.episodes._id": episodeID,
        },
        {
          $set: {
            "chapters.$.episodes": newEpisode,
          },
        }
      );

      if (editEpisodeResult.modifiedCount == 0)
        throw new createHttpError.InternalServerError("ویرایش قسمت انجام نشد");

      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "ویرایش قسمت با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneEpisode(episodeID) {
    const course = await CourseModel.findOne(
      {
        "chapters.episodes._id": episodeID,
      },
      {
        "chapters.episodes.$": 1,
      }
    );

    if (!course) throw createHttpError.NotFound("قسمتی یافت نشد");

    const episode = await course?.chapters?.[0]?.episodes?.[0];
    if (!episode) throw createHttpError.NotFound("قسمتی یافت نشد");

    return copyObject(episode);
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
