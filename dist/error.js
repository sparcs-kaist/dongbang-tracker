"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowError = exports.FlowErrorType = exports.InternalError = exports.InternalErrorType = void 0;
class ServerError extends Error {
    constructor(type) {
        super();
        this.type = type;
        this.message = typeof type === "string" ? type : "UNKNOWN_ERROR";
    }
}
var InternalErrorType;
(function (InternalErrorType) {
    InternalErrorType["INVALID_WIFI_RESPONSE"] = "INVALID_WIFI_RESPONSE";
    InternalErrorType["WIFI_REQUEST_FAILED"] = "WIFI_REQUEST_FAILED";
    InternalErrorType["IP_PARSER_ERROR"] = "IP_PARSER_ERROR";
})(InternalErrorType = exports.InternalErrorType || (exports.InternalErrorType = {}));
class InternalError extends ServerError {
}
exports.InternalError = InternalError;
var FlowErrorType;
(function (FlowErrorType) {
    FlowErrorType["DEVICE_NOT_FOUND"] = "DEVICE_NOT_FOUND";
})(FlowErrorType = exports.FlowErrorType || (exports.FlowErrorType = {}));
class FlowError extends ServerError {
}
exports.FlowError = FlowError;
