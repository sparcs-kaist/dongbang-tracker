"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashDevices = exports.filterDevices = void 0;
const crypto_1 = require("crypto");
const schema_1 = require("../schema");
const hash = (0, crypto_1.createHash)("md5");
const filterDevices = (devices) => devices.filter(device => device.connect_type !== schema_1.ConnectType.WIRE
    && device.dynamic !== schema_1.DynamicType.STATIC);
exports.filterDevices = filterDevices;
const hashDevices = (devices) => devices.map(device => hash
    .update(device.hwaddr)
    .copy()
    .digest("base64url"));
exports.hashDevices = hashDevices;
