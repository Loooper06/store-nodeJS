const { ResponseType } = require("../typeDefs/public.types");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { GraphQLString, GraphQLInt } = require("graphql");
const { checkExistProduct } = require("../utils");
const { UserModel } = require("../../models/users");
const { copyObject } = require("../../utils/functions");

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

module.exports = {
  AddCourseToBasket,
  AddProductToBasket,
  RemoveCourseToBasket,
  RemoveProductToBasket,
};
