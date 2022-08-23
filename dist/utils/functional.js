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
exports.stringifyError = exports.fetchOne = exports.respond = exports.error = exports.pipe = void 0;
const pipe = (initialValue) => __awaiter(void 0, void 0, void 0, function* () { return initialValue; });
exports.pipe = pipe;
const error = (message) => { throw new Error(message); };
exports.error = error;
const respond = (res, field) => (data) => res.json({ hello: "dongbang", [field]: data });
exports.respond = respond;
const fetchOne = (array) => array.length === 1
    ? array[0]
    : (0, exports.error)("filter error");
exports.fetchOne = fetchOne;
const stringifyError = (err) => err instanceof Error
    ? err.message
    : String(err);
exports.stringifyError = stringifyError;
