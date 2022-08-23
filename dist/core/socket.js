"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const socket_io_client_1 = require("socket.io-client");
const config_1 = require("./config");
exports.socket = (0, socket_io_client_1.io)(config_1.config.endpoint, {
    auth: { token: config_1.config.token },
});
