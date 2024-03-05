"use strict";

const { ConflictError } = require("../core/error.response");
const db = require("../db/init.mysql");

class AccessService {
  static signUp = async ({ email, password }) => {
    const foundUser = await db.User.findOne({
      where: {
        user_email: email,
      },
    });

    if (foundUser) throw new ConflictError("Email already registered");

    return foundUser;
  };
}

module.exports = AccessService;
