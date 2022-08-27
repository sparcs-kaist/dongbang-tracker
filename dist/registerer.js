"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRegisterer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ip_1 = __importDefault(require("ip"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const config_1 = require("./core/config");
const api_1 = require("./wifi/api");
const devices_1 = require("./utils/devices");
const ip_2 = require("./utils/ip");
const functional_1 = require("./utils/functional");
const connection_1 = require("./connection");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.engine("html", (0, mustache_express_1.default)());
app.set("view engine", "html");
app.set("views", __dirname + "/static");
app.get("/:token", (req, res) => {
    res.render("index.html", {
        token: req.params.token,
        ip: ip_1.default.address(),
        port: config_1.config.port,
    });
});
app.get("/register/:token", (req, res, next) => (0, functional_1.pipe)()
    .then(api_1.fetchLanInfo)
    .then(devices_1.filterDevices)
    .then((0, ip_2.filterByIp)(req.ip))
    .then(devices_1.hashDevices)
    .then(functional_1.fetchOne)
    .then((0, connection_1.registerDevice)(req.params.token, !!req.query.force))
    .then((0, functional_1.respond)(res, "result"))
    .catch(next));
app.use((err, req, res, _) => (0, functional_1.pipe)(err)
    .then(functional_1.stringifyError)
    .then((0, functional_1.respond)(res, "error")));
const initRegisterer = () => {
    app.listen(config_1.config.port, () => console.log(`Registerer listening on port ${config_1.config.port}`));
};
exports.initRegisterer = initRegisterer;
