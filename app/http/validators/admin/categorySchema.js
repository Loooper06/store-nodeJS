const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constans");

const addCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمی باشد")),
  parent: Joi.string()
    .allow("")
    .pattern(MONGO_ID_PATTERN)
    .allow("")
    .error(new Error("شناسه وارد شده صحیح نمی باشد")),
});

const editCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمی باشد")),
});

module.exports = {
  addCategorySchema,
  editCategorySchema
};
