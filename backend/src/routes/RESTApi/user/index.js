"use strict";

const express = require('express');
const router = express.Router();
const asyncHandler = require('../../../helpers/asyncHandler');
const { route } = require('../access');
const authentication = require("../../../middlewares/authentication");
const UserController = require('../../../controller/user.controller');

router.use(authentication);
router.get('/users/:id', asyncHandler(UserController.getuserinfo));

module.exports = router;