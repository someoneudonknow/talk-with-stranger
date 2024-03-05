"use-strict";

const demoRouter = require("./demo/index.js");

module.exports = (socket) => {
  demoRouter(socket);
};
