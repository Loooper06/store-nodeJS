const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constans");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان بلاگ صحیح نمی باشد")),
  text: Joi.string().error(new Error("متن ارسال شده صحیح نمی باشد")),
  short_text: Joi.string().error(new Error("متن ارسال شده صحیح نمی باشد")),
  image: Joi.string().error(new Error("تصویر ارسال شده صحیح نمی باشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(new Error("برچسب ها نمی تواند بیشتر از 20 آیتم باشد")),
  category: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(new Error("دسته بندی مورد نظر یافت نشد")),
});

const updateCategorySchema = Joi.object({
  title: Joi.string().min(3).max(30).error("عنوان بلاگ صحیح نمی باشد"),
});

module.exports = {
  createBlogSchema,
};
