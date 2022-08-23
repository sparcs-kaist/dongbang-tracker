"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDevice = exports.sendCurrentDevices = void 0;
const socket_1 = require("./core/socket");
const sendCurrentDevices = (devices) => {
    socket_1.socket.emit("devices", devices);
};
exports.sendCurrentDevices = sendCurrentDevices;
const checkDevice = (deviceId) => new Promise(resolve => {
    socket_1.socket.emit("check", deviceId, resolve);
});
exports.checkDevice = checkDevice;
