"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Import route handlers for different API endpoints
const auth_1 = __importDefault(require("./auth"));
const rooms_1 = __importDefault(require("./rooms"));
const users_1 = __importDefault(require("./users"));
const search_1 = __importDefault(require("./search"));
const router = (0, express_1.Router)();
// Create a rate limiter middleware for general routes
const generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // maximum number of requests allowed in the window
    message: 'Too many requests from this IP, please try again later.',
});
// Create a rate limiter middleware specifically for the /auth route
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 5000, // 5 minutes
    max: 500, // maximum number of requests allowed in the window for /auth route
    message: 'Too many requests for authentication from this IP, please try again later.',
});
// Mount the authentication routes under the path '/auth' with rate limiting
router.use('/auth', authLimiter, auth_1.default);
// Mount the rooms routes under the path '/rooms' with general rate limiting
router.use('/rooms', generalLimiter, rooms_1.default);
// Mount the users routes under the path '/users' with general rate limiting
router.use('/users', generalLimiter, users_1.default);
// Mount the search routes under the path '/search' with general rate limiting
router.use('/search', generalLimiter, search_1.default);
exports.default = router;
