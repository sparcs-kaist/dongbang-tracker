"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByIp = void 0;
const ip6addr_1 = __importDefault(require("ip6addr"));
const format = (ip) => {
    try {
        return ip6addr_1.default.parse(ip).toString({ format: "v4" });
    }
    catch (_a) {
        return "";
    }
};
const filterByIp = (ip) => (devices) => devices.filter(device => device.ipaddr === format(ip));
exports.filterByIp = filterByIp;
