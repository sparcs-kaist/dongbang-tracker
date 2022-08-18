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
exports.Poller = void 0;
const wifi_1 = require("./wifi");
const api_1 = require("./api");
class Poller {
    constructor(interval) {
        this.interval = interval || 3000;
        this.prevDevices = new Set([]);
    }
    start() {
        this.timer = setInterval(() => this.poll().catch(console.error), this.interval);
    }
    stop() {
        clearInterval(this.timer);
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield this.getDeviceSet();
            const { entered, exited } = this.getDiff(devices);
            this.prevDevices = devices;
            entered.forEach(mac => console.log(`Entered: ${mac}`));
            exited.forEach(mac => console.log(`Exited: ${mac}`));
            (0, api_1.changeStatus)({ entered, exited }).catch(console.error);
        });
    }
    getDeviceSet() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Set((yield (0, wifi_1.getConnectedDevices)())
                .filter(device => device.connect_type === wifi_1.ConnectType.WIRELESS)
                .map(device => device.hwaddr));
        });
    }
    getDiff(devices) {
        const entered = diff(devices, this.prevDevices);
        const exited = diff(this.prevDevices, devices);
        return { entered, exited };
    }
}
exports.Poller = Poller;
const diff = (set1, set2) => ([...set1].filter(item => !set2.has(item)));
