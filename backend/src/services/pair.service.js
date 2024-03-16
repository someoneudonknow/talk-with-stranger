"use strict";

const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../core/error.response");
const db = require("../db/init.mysql");

class PairService {
  static createPair = async ({ requester }) => {};
}

module.exports = PairService;
