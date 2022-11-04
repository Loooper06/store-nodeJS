const { ResponseType } = require("../typeDefs/public.types");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { GraphQLString } = require("graphql");
const { checkExistProduct, checkExistCourse } = require("../utils");
const { UserModel } = require("../../models/users");
const { copyObject } = require("../../utils/functions");
const createHttpError = require("http-errors");

const AddProductToBasket = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    if (product) {
      await UserModel.updateOne(
        { _id: user._id, "basket.products.productID": productID },
        {
          $inc: {
            "basket.products.$.count": 1,
          },
        }
      );
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "basket.products": { productID, count: 1 },
          },
        }
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "محصول با موفقیت به سبد خرید افزوده شد",
      },
    };
  },
};

const AddCourseToBasket = {
  type: ResponseType,
  args: {
    courseID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    const course = await findCourseInBasket(user._id, courseID);
    if (course) {
      return {
        statusCode: HttpStatus.CONFLICT,
        data: {
          message: "دوره قبلا به سبد خرید افزوده شده است",
        },
      };
    } else {
      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "basket.courses": { courseID },
          },
        }
      );
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "دوره با موفقیت به سبد خرید اضافه شد",
      },
    };
  },
};

const RemoveProductToBasket = {
  type: ResponseType,
  args: {
    productID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productID } = args;
    await checkExistProduct(productID);
    const product = await findProductInBasket(user._id, productID);
    let message;
    if (!product)
      throw createHttpError.NotFound("محصول مورد نظر در سبد خرید یافت نشد");

    if (product.count > 1) {
      await UserModel.updateOne(
        {
          _id: user._id,
          "basket.products.productID": productID,
        },
        {
          $inc: {
            "basket.products.$.count": -1,
          },
        }
      );
      message = "تعداد محصول یک واحد کاهش یافت";
    } else {
      await UserModel.updateOne(
        {
          _id: user._id,
          "basket.products.productID": productID,
        },
        {
          $pull: {
            "basket.products": {
              productID,
            },
          },
        }
      );
      message = "محصول با موفقیت از سبد خرید حذف شد";
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        message,
      },
    };
  },
};

const RemoveCourseToBasket = {
  type: ResponseType,
  args: {
    courseID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    const course = await findCourseInBasket(user._id, courseID);

    if (!course) throw createHttpError.NotFound("دوره مورد نظر یافت نشد");
    await UserModel.updateOne(
      { _id: user._id, "basket.courses.courseID": courseID },
      { $pull: { "basket.courses": { courseID } } }
    );

    return {
      statusCode: HttpStatus.OK,
      data: {
        message: "دوره با موفقیت از سبد خرید حذف شد",
      },
    };
  },
};

//!Find Product in Basket
async function findProductInBasket(userID, productID) {
  const findResult = await UserModel.findOne(
    { _id: userID, "basket.products.productID": productID },
    { "basket.products.$": 1 }
  );
  const userDetail = copyObject(findResult);
  return userDetail?.basket?.products?.[0];
}

async function findCourseInBasket(userID, courseID) {
  const findResult = await UserModel.findOne(
    { _id: userID, "basket.courses.courseID": courseID },
    { "basket.courses.$": 1 }
  );
  const userDetail = copyObject(findResult);
  return userDetail?.basket?.courses?.[0];
}

module.exports = {
  AddCourseToBasket,
  AddProductToBasket,
  RemoveCourseToBasket,
  RemoveProductToBasket,
};
