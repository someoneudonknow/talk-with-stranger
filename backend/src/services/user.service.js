"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const db = require("../db/init.mysql");
const UploadService = require("./upload.service");
const path = require("path");

class UserService {
  //param of async is accessToken (I don't know it is an id of token or accessToken)
  static getUserInfo = async (userID) => {
    if (!userID) throw new BadRequestError("Invalid userID");

    const foundUser = await db.User.findOne({
      where: {
        id: userID,
      },
    });
    if (!foundUser) throw new NotFoundError("User not found");
    return foundUser;
  };

  static updateAvatar = async (userId, file) => {
    if (!file) throw new BadRequestError("File not found");

    const foundUser = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser) throw new NotFoundError("Your not registered");

    const url = await UploadService.uploadOne({
      file,
      folderName: `user-${foundUser.id}`,
      fileName: `avatar-${Date.now()}${path.extname(file.originalname)}`,
    });

    foundUser.update({ user_avatar: url });

    foundUser.save();

    return url;
  };

  static updateBackground = async ({ userId, file }) => {
    if (!file) throw new BadRequestError("File not found");

    const foundUser = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser) throw new NotFoundError("Your not registered");

    const url = await UploadService.uploadOne({
      file,
      folderName: `user-${foundUser.id}`,
      fileName: `background-${Date.now()}${path.extname(file.originalname)}`,
    });

    foundUser.update({ user_background: url });

    foundUser.save();

    return url;
  };
}

module.exports = UserService;
