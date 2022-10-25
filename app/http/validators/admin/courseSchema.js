const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../../utils/constans");

const createCourseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان دوره صحیح نمی باشد")),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")
  ),
  short_text: Joi.string().error(
    createHttpError.BadRequest("متن کوتاه ارسال شده صحیح نمی باشد")
  ),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(
      createHttpError.BadRequest("برچسب ها نمی تواند بیشتر از 20 آیتم باشد")
    ),
  category: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  price: Joi.number().error(
    createHttpError.BadRequest("قیمت ارسال شده صحیح نمی باشد")
  ),
  discount: Joi.number()
    .allow()
    .error(createHttpError.BadRequest("تخفیف ارسال شده صحیح نمی باشد")),
  type: Joi.string().error(
    createHttpError.BadRequest("نوع دوره ارسال شده صحیح نمی باشد")
  ),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),

  fileUploadPath: Joi.allow(),
});

module.exports = {
  createCourseSchema,
};
