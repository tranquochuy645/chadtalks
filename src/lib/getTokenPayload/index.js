"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenPayload = void 0;
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenPayload = (token) => {
    const secretKey = config_1.default.jwt_key;
    const payload = jsonwebtoken_1.default.verify(token, secretKey);
    return payload;
};
exports.getTokenPayload = getTokenPayload;
