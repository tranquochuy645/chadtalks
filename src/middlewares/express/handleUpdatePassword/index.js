"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const isWeakPassword_1 = require("../../../lib/isWeakPassword");
const handleUpdatePassword = (req, res, next) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password) {
        const password = req.body.password;
        if ((0, isWeakPassword_1.isWeakPassword)(password)) {
            return res.status(422).json({ message: "Weak Password" });
        }
        // Hash the password
        return bcrypt_1.default.hash(password, 10, (err, hash) => {
            if (err) {
                throw err;
            }
            else {
                // Update the request body with the hashed password
                req.body.password = hash;
                // Continue to the next middleware or route handler
                return next();
            }
        });
    }
    next();
};
exports.handleUpdatePassword = handleUpdatePassword;
