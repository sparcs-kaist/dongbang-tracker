"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogError = void 0;
class LogError extends Error {
    constructor(message) {
        console.error(message);
        super(message);
    }
}
exports.LogError = LogError;
