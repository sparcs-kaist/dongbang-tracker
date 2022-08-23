"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = exports.DynamicType = exports.ConnectType = void 0;
const class_validator_1 = require("class-validator");
var ConnectType;
(function (ConnectType) {
    ConnectType["WIRE"] = "S_WIRE";
    ConnectType["WIRELESS"] = "S_WIRELESS";
    ConnectType["WIRE_UNKNOWN"] = "S_WIRE_UNKNOWN";
})(ConnectType = exports.ConnectType || (exports.ConnectType = {}));
var DynamicType;
(function (DynamicType) {
    DynamicType["STATIC"] = "0";
    DynamicType["DYNAMIC"] = "1";
})(DynamicType = exports.DynamicType || (exports.DynamicType = {}));
class Device {
}
__decorate([
    (0, class_validator_1.IsEnum)(ConnectType)
], Device.prototype, "connect_type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(DynamicType)
], Device.prototype, "dynamic", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], Device.prototype, "hostname", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], Device.prototype, "ipaddr", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], Device.prototype, "hwaddr", void 0);
exports.Device = Device;
