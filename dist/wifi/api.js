"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLanInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const parser_1 = require("./parser");
const config_1 = require("../core/config");
const error_1 = require("../error");
const fetchLanInfo = () => {
    return axios_1.default.get("http://192.168.0.1/cgi/iux_get.cgi?tmenu=netinfo&smenu=laninfo&act=status", {
        auth: {
            username: config_1.config.username,
            password: config_1.config.password,
        },
        headers: {
            Referer: "http://192.168.0.1/netinfo/laninfo/iux.cgi",
        },
        timeout: config_1.config.interval,
        insecureHTTPParser: true,
    })
        .then(res => Promise.resolve((0, parser_1.parse)(res.data)))
        .catch(() => Promise.reject(new error_1.LogError("WiFi request failed")));
};
exports.fetchLanInfo = fetchLanInfo;
