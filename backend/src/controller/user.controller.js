"use strict";

const {Model} = require('sequelize');
const { SuccessResponse } = require("../core/success.response");
const UserService = require('../services/user.service');

class UserController{
    static getuserinfo = async (req, res, next) => {
        const userID = req.params.id;
        new SuccessResponse({
            message: 'Get user info success',
            metadata: await UserService.getUserInfo(userID),
        }).send(res);
    };
}

module.exports = UserController;

