const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MONGO_ID_PATTERN } = require("../../utils/constans");

const ObjectValidator = Joi.object({
  id: Joi.string()
    .pattern(MONGO_ID_PATTERN)
    .error(createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد")),
});

module.exports = {
  ObjectValidator,
};
