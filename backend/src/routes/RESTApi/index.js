"use strict";

const express = require("express");

const router = express.Router();

// app routes definitions here
router.use("/api/v1", require("./access"));

module.exports = router;
