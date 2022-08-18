"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMacAddress = exports.getConnectedDevices = exports.ConnectType = void 0;
const axios_1 = __importDefault(require("axios"));
const error_1 = require("./error");
var ConnectType;
(function (ConnectType) {
    ConnectType["WIRE"] = "S_WIRE";
    ConnectType["WIRELESS"] = "S_WIRELESS";
    ConnectType["WIRE_UNKNOWN"] = "S_WIRE_UNKNOWN";
})(ConnectType = exports.ConnectType || (exports.ConnectType = {}));
const isValidConnectedDevice = (device) => {
    if (Object.values(ConnectType).includes(device === null || device === void 0 ? void 0 : device.connect_type)
        && ["0", "1"].includes(device === null || device === void 0 ? void 0 : device.dynamic)
        && typeof (device === null || device === void 0 ? void 0 : device.hostname) === "string"
        && typeof (device === null || device === void 0 ? void 0 : device.ipaddr) === "string"
        && typeof (device === null || device === void 0 ? void 0 : device.hwaddr) === "string")
        return true;
    if (JSON.stringify(device) === "{\"\":\"\"}")
        return false;
    throw new error_1.InternalError(error_1.InternalErrorType.INVALID_WIFI_RESPONSE);
};
const fetchWiFiAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield axios_1.default.get("http://192.168.0.1/cgi/iux_get.cgi?tmenu=netinfo&smenu=laninfo&act=status", {
            auth: {
                username: process.env.ADMIN_USERNAME || "admin",
                password: process.env.ADMIN_PASSWORD || "password",
            },
            headers: {
                Referer: "http://192.168.0.1/netinfo/laninfo/iux.cgi"
            },
            timeout: 5000,
        });
    }
    catch (e) {
        console.error(e);
        throw new error_1.InternalError(error_1.InternalErrorType.WIFI_REQUEST_FAILED);
    }
});
const getConnectedDevices = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const res = yield fetchWiFiAPI();
    if (!Array.isArray((_a = res.data) === null || _a === void 0 ? void 0 : _a.addlist))
        throw new Error("Invalid response");
    return res.data.addlist.filter(isValidConnectedDevice);
});
exports.getConnectedDevices = getConnectedDevices;
const getMacAddress = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const addlist = yield (0, exports.getConnectedDevices)();
    const device = (_b = addlist.filter(({ ipaddr }) => ipaddr === ip)) === null || _b === void 0 ? void 0 : _b[0];
    if (!device)
        throw new error_1.FlowError(error_1.FlowErrorType.DEVICE_NOT_FOUND);
    return device.hwaddr;
});
exports.getMacAddress = getMacAddress;
