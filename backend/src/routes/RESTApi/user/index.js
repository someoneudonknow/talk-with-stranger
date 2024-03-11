"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("../../../helpers/asyncHandler");
const { route } = require("../access");
const authentication = require("../../../middlewares/authentication");
const UserController = require("../../../controller/user.controller");
const { uploadMemory } = require("../../../services/multer.service");

router.use(authentication);
router.get("/users/:id", asyncHandler(UserController.getuserinfo));
router.patch(
  "/users/avatar",
  uploadMemory.single("avatar"),
  asyncHandler(UserController.updateUserAvatar)
);
router.patch(
  "/users/background",
  uploadMemory.single("background"),
  asyncHandler(UserController.updateUserBackground)
);

module.exports = router;
