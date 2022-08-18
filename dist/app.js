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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const wifi_1 = require("./wifi");
const parser_1 = require("./parser");
const error_1 = require("./error");
const poller_1 = require("./poller");
const api_1 = require("./api");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
const port = process.env.PORT || 3000;
const baseResponse = { hello: "dongbang" };
app.get("/dongbang", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ip = (0, parser_1.parseIpAddress)(req.ip);
        const macAddress = yield (0, wifi_1.getMacAddress)(ip);
        if (!(yield (0, api_1.checkRegistered)(macAddress))) {
            return res.json(Object.assign(Object.assign({}, baseResponse), { macAddress }));
        }
    }
    catch (e) {
        if (e instanceof error_1.FlowError) {
            return res.json(baseResponse);
        }
        return res.json(Object.assign(Object.assign({}, baseResponse), { error: (typeof (e === null || e === void 0 ? void 0 : e.message) === "string")
                ? e.message
                : "UNKNOWN_ERROR" }));
    }
    return res.json(baseResponse);
}));
const poller = new poller_1.Poller();
poller.start();
app.listen(port, () => console.log(`listening on port ${port}`));
