"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // You can determine the destination directory based on an argument or any other logic here
        const dynamicPath = `media/${req.params.userId}/${req.params.roomId}`; // Replace this with your logic
        cb(null, dynamicPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const multerUpload = (0, multer_1.default)({ storage: storage }).single('file'); // Specify the field name for the uploaded file
exports.multerUpload = multerUpload;
