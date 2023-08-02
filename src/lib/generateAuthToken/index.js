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
    const tokenPayload = { userId };
    const token = jsonwebtoken_1.default.sign(tokenPayload, secretKey, { expiresIn: '2h' });
    return token;
};
exports.generateAuthToken = generateAuthToken;
// export const generateAuthToken_v2 = (userId: string): string => {
//     // This version includes additional payload claims that required by firebase
//     // Generate and return an authentication token based on the user's information
//     const secretKey = conf.jwt_key;
//     const now = new Date();
//     const expirationTime = new Date(now.getTime() + 3600 * 1000); // 3600 seconds (1 hour) in milliseconds
//     const tokenPayload = {
//         uid: userId,
//         exp: Math.floor(expirationTime.getTime() / 1000), // Convert expirationTime to seconds
//         iat: Math.floor(now.getTime() / 1000), // Convert current time to seconds
//         aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
//         sub: conf.service_account_email,
//         iss: conf.service_account_email,
//         alg: "RS256"
//     };
//     const token = jwt.sign(tokenPayload, secretKey);
//     return token;
// }
