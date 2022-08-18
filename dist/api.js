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
exports.checkRegistered = exports.changeStatus = void 0;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: process.env.API_ENDPOINT || "https://dongbang.sparcs.org/api/",
    timeout: 5000,
    // headers: {"X-API-Key": process.env.API_KEY || "dongbang"},
});
const changeStatus = ({ entered, exited }) => __awaiter(void 0, void 0, void 0, function* () {
    if (entered.length + exited.length > 0) {
        yield instance.post("status", { entered, exited });
    }
});
exports.changeStatus = changeStatus;
const checkRegistered = (macAddress) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const res = yield instance.get(`device/${macAddress}`);
    return (typeof ((_a = res.data) === null || _a === void 0 ? void 0 : _a.registered) === "boolean") ? res.data.registered : true;
});
exports.checkRegistered = checkRegistered;
