"use strict";

const express = require("express");

const router = express.Router();
const AccessController = require("../../../controller/access.controller");
const asyncHandler = require("../../../helpers/asyncHandler");

router.post("/users/signup", asyncHandler(AccessController.signup));

module.exports = router;
