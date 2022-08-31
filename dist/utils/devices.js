"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashDevices = exports.filterDevices = void 0;
const crypto_1 = require("crypto");
const schema_1 = require("../schema");
const filterDevices = (devices) => devices.filter(device => device.connect_type === schema_1.ConnectType.WIRELESS
    && device.dynamic === schema_1.DynamicType.DYNAMIC);
exports.filterDevices = filterDevices;
const hashDevices = (devices) => devices.map(device => (0, crypto_1.createHash)("md5")
    .update(device.ipaddr)
    .digest("hex"));
exports.hashDevices = hashDevices;
