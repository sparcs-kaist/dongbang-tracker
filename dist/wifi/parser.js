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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const schema_1 = require("../schema");
const parse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!("addlist" in data) || !Array.isArray(data.addlist)) {
        throw new Error("Invalid response from WiFi API");
    }
    const devices = data.addlist
        .slice(0, -1)
        .map(device => (0, class_transformer_1.plainToInstance)(schema_1.Device, device));
    const validationResults = yield Promise.all(devices.map(device => (0, class_validator_1.validate)(device)));
    if (validationResults.some(result => result.length > 0)) {
        throw new Error("Invalid response from WiFi API");
    }
    return devices;
});
exports.parse = parse;
