"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const generateAuthToken = (userId) => {
    // Generate and return an authentication token based on the user's information
    const secretKey = config_1.default.jwt_key;
    const tokenPayload = {
        userId
    };
    const token = jsonwebtoken_1.default.sign(tokenPayload, secretKey, { expiresIn: '2h' });
    return token;
};
exports.generateAuthToken = generateAuthToken;
