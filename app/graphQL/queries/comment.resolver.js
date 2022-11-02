const { GraphQLString } = require("graphql");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blogs");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");

const CreateCommentForBlog = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    blogID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, blogID, parent } = args;
    await checkExistBlog(blogID);
    const blogUpdateResult = await BlogModel.updateOne(
      { _id: blogID },
      {
        $push: {
          comments: {
            comment,
            user: user._id,
            show: false,
            openToComment: !parent,
          },
        },
      }
    );

    if (blogUpdateResult.modifiedCount == 0)
      throw createHttpError.InternalServerError("نظر ثبت نشد (خطای سرور)");

    return {
      statusCode: httpStatus.OK,
      data: {
        message: "ثبت نظر با موفقیت انجام شد پس از تایید نمایش داده خواهد شد",
      },
    };
  },
};

async function checkExistBlog(id) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw createHttpError.NotFound("بلاگ یافت نشد");
  return blog;
}

module.exports = {
  CreateCommentForBlog,
};
