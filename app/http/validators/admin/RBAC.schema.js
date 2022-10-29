const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../utils/constans");

const addRoleSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان نقش صحیح نمی باشد")),
  description: Joi.string()
    .min(3)
    .max(150)
    .error(new Error("توضیحات نقش صحیح نمی باشد")),
  permissions: Joi.array()
    .items(Joi.string().pattern(MONGO_ID_PATTERN))
    .error(new Error("سطوح دسترسی های ارسال شده صحیح نمی باشد")),
});

const addPermissionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی صحیح نمی باشد")),

  description: Joi.string()
    .min(3)
    .max(150)
    .error(new Error("نوضیحات سطح دسترسی صحیح نمی باشد")),
});

module.exports = {
  addRoleSchema,
  addPermissionSchema,
};
