"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const socket_1 = require("./core/socket");
const tracker_1 = require("./tracker");
const registerer_1 = require("./registerer");
const init = () => {
    (0, tracker_1.initTracker)(socket_1.socket);
    (0, registerer_1.initRegisterer)();
};
exports.init = init;
(0, exports.init)();
