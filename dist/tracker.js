"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTracker = void 0;
const api_1 = require("./wifi/api");
const connection_1 = require("./connection");
const devices_1 = require("./utils/devices");
const functional_1 = require("./utils/functional");
const initTracker = (socket) => {
    let timer = null;
    const track = () => (0, functional_1.pipe)()
        .then(api_1.fetchLanInfo)
        .then(devices_1.filterDevices)
        .then(devices_1.hashDevices)
        .then(connection_1.sendCurrentDevices)
        .catch(console.error);
    socket.on("connect", () => {
        timer = setInterval(track, 5000);
    });
    socket.on("disconnect", () => {
        clearInterval(timer);
        timer = null;
    });
};
exports.initTracker = initTracker;
