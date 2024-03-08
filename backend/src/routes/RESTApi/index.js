"use strict";

const express = require("express");

const router = express.Router();

// app routes definitions here
router.use("/api/v1", require("./access"));
router.use("/api/vi", require('./User'));

module.exports = router;
