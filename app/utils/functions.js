const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const redisClient = require("./init_redis");
const fs = require("fs");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans");
const path = require("path");

function numberRandomGen() {
  return Math.floor(Math.random() * 90000 + 10000);
}

function SignAccessToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ _id: userID });

    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1d",
    };
    const secret = ACCESS_TOKEN_SECRET_KEY;

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}

function SignRefreshToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ _id: userID });

    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1d",
    };
    const secret = REFRESH_TOKEN_SECRET_KEY;

    jwt.sign(payload, secret, options, async (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سرور"));
      await redisClient.setEx(String(userID), 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
}

function VerifyRefreshToken(token) {
  try {
    return new Promise((resolve, reject) => {
      jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
        if (err)
          reject(
            createHttpError.Unauthorized("ابتدا وارد حساب کاربری خود شوید")
          );
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) reject(createHttpError.NotFound("حساب کاربری یافت نشد"));
        const refreshToken = await redisClient.get(String(user._id));
        if (token === refreshToken) return resolve(mobile);
        reject(
          createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد")
        );
      });
    });
  } catch (err) {
    next(err);
  }
}

function deleteFileInPublic(fileAddress) {
  const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);

  fs.unlinkSync(pathFile);
}

function listOfImagesFromRequest(files, fileUploadPath) {
  if (files.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function setFeatures(body) {
  const { colors, models, madein, length, weight, width, height } = body;
  let features;
  features.colors = colors;
  features.models = models;
  features.madein = madein;

  if (!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)) {
    if (!width) features.width = 0;
    else features.width = +width;
    if (!height) features.height = 0;
    else features.height = +height;
    if (!length) features.length = 0;
    else features.length = +length;
    if (!weight) features.weight = 0;
    else features.weight = +weight;
  }

  return features;
}

module.exports = {
  numberRandomGen,
  SignAccessToken,
  SignRefreshToken,
  VerifyRefreshToken,
  deleteFileInPublic,
  listOfImagesFromRequest,
  copyObject,
  setFeatures,
};
