"use strict";

const OnlineUserManager = require("../../../managers/onlineUsers.manager");

module.exports = (socket) => {
  socket.on("conservation/findRandom", (payload) => {
    OnlineUserManager.addConnectionToPairingQueue({ ...payload, socket });
  });

  socket.on("conservation/cancelFind", (payload) => {
    OnlineUserManager.removeConnectionFromPairingQueue(payload);
  });
};
