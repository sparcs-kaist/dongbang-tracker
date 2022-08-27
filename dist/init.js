"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const registerer_1 = require("./registerer");
const init = () => {
    // initTracker(socket);
    (0, registerer_1.initRegisterer)();
};
exports.init = init;
(0, exports.init)();
