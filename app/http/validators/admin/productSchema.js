const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../../utils/constans");

const createProductSchema = Joi.object({
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
    createHttpError.BadRequest("نوع محصول ارسال شده صحیح نمی باشد")
  ),
  count: Joi.number().error(
    createHttpError.BadRequest("تعداد ارسال شده صحیح نمی باشد")
  ),

  colors: Joi.array().error(
    createHttpError.BadRequest("رنگهای ارسال شده صحیح نمی باشد")
  ),

  madein: Joi.string().error(
    createHttpError.BadRequest("محل ساخت صحیح نمی باشد")
  ),

  model: Joi.array().error(
    createHttpError.BadRequest("مدل های ارسال شده صحیح نمی باشد")
  ),

  weight: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("وزن ارسال شده صحیح نمی باشد")),
  length: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("طول ارسال شده صحیح نمی باشد")),
  width: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("عرض ارسال شده صحیح نمی باشد")),
  height: Joi.number()
    .allow(null, 0, "0")
    .error(createHttpError.BadRequest("ارتفاع ارسال شده صحیح نمی باشد")),

  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),

  fileUploadPath: Joi.allow(),
});

module.exports = {
  createProductSchema,
};
