"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Import the version 1 (v1) router that contains all version 1 routes.
const v1_1 = __importDefault(require("./v1"));
const router = (0, express_1.Router)();
// Mount the version 1 (v1) router under the path '/v1'.
router.use('/v1', v1_1.default);
// If none of the routes matched, respond with a 418 "I'm a teapot" status code and a custom message.
router.all('*', (req, res) => {
    res.status(418).json({ message: "I'm not gonna deal with this" });
});
exports.default = router;
