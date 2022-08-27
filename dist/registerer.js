"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRegisterer = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("./wifi/api");
const devices_1 = require("./utils/devices");
const ip_1 = require("./utils/ip");
const functional_1 = require("./utils/functional");
const config_1 = require("./core/config");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    // render()
});
app.get("/dongbang", (req, res, next) => (0, functional_1.pipe)()
    .then(api_1.fetchLanInfo)
    .then(devices_1.filterDevices)
    .then((0, ip_1.filterByIp)(req.ip))
    .then(devices_1.hashDevices)
    .then(functional_1.fetchOne)
    .then((0, functional_1.respond)(res, "deviceId"))
    .catch(next));
app.use((err, req, res, _) => (0, functional_1.pipe)(err)
    .then(functional_1.stringifyError)
    .then((0, functional_1.respond)(res, "error")));
const initRegisterer = () => {
    app.listen(config_1.config.port, () => console.log(`Registerer listening on port ${config_1.config.port}`));
};
exports.initRegisterer = initRegisterer;
