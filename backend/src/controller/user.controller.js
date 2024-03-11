"use strict";

const { Model } = require("sequelize");
const { SuccessResponse } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
  static getuserinfo = async (req, res, next) => {
    const userID = req.params.id;
    new SuccessResponse({
      message: "Get user info success",
      metadata: await UserService.getUserInfo(userID),
    }).send(res);
  };

  static updateUserAvatar = async (req, res, next) => {
    new SuccessResponse({
      message: "Update user avatar success",
      metadata: await UserService.updateAvatar(req.user.userId, req.file),
    }).send(res);
  };

  static updateUserBackground = async (req, res, next) => {
    new SuccessResponse({
      message: "Update user background success",
      metadata: await UserService.updateBackground({
        userId: req.user.userId,
        file: req.file,
      }),
    }).send(res);
  };
}

module.exports = UserController;
