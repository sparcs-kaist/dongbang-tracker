"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIpAddress = void 0;
const ip6addr_1 = __importDefault(require("ip6addr"));
const error_1 = require("./error");
const parseIpAddress = (ip) => {
    try {
        return ip6addr_1.default.parse(ip).toString({ format: "v4" });
    }
    catch (_a) {
        throw new error_1.InternalError(error_1.InternalErrorType.IP_PARSER_ERROR);
    }
};
exports.parseIpAddress = parseIpAddress;
