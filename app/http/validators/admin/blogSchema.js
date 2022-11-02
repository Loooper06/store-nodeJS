const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../../utils/constans");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان بلاگ صحیح نمی باشد")),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")
  ),
  short_text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")
  ),
  image: Joi.allow(),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(
      createHttpError.BadRequest("برچسب ها نمی تواند بیشتر از 20 آیتم باشد")
    ),
  category: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  fileUploadPath: Joi.allow(),
});

// const updateCategorySchema = Joi.object({
//   title: Joi.string()
//     .min(3)
//     .max(30)
//     .error(createHttpError.BadRequest("عنوان بلاگ صحیح نمی باشد")),
// });

module.exports = {
  createBlogSchema,
};
