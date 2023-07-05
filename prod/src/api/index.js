"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const rooms_1 = __importDefault(require("./rooms"));
const users_1 = __importDefault(require("./users"));
const router = (0, express_1.default)();
router.use('/auth', auth_1.default);
router.use('/rooms', rooms_1.default);
router.use('/users', users_1.default);
exports.default = router;