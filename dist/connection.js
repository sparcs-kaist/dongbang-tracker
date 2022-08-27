"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDevice = exports.sendCurrentDevices = void 0;
const socket_1 = require("./core/socket");
const sendCurrentDevices = (devices) => {
    socket_1.socket.emit("devices", devices);
};
exports.sendCurrentDevices = sendCurrentDevices;
const registerDevice = (token, force) => (deviceId) => new Promise(resolve => {
    socket_1.socket.emit("register", { token, deviceId, force }, resolve);
});
exports.registerDevice = registerDevice;
