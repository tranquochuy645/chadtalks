"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dynamicPath = `media/${req.params.userId}/${req.params.roomId}`;
        // Create the directory if it doesn't exist
        fs_1.default.mkdirSync(dynamicPath, { recursive: true });
        cb(null, dynamicPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const multerUpload = (0, multer_1.default)({ storage: storage }).single('file');
exports.multerUpload = multerUpload;
