"use-strict";

const connectionRouter = require("./connection/index.js");
const conservationRouter = require("./conservation");

module.exports = (socket) => {
  connectionRouter(socket);
  conservationRouter(socket);

  socket.on("message", (message) => {
    console.log(message);
  });
};
