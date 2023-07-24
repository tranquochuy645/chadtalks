"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3Controller {
    constructor() {
        // Private constructor to enforce singleton pattern
        this.s3 = new aws_sdk_1.default.S3();
    }
    static getInstance() {
        if (!S3Controller.instance) {
            S3Controller.instance = new S3Controller();
        }
        return S3Controller.instance;
    }
    init(config) {
        aws_sdk_1.default.config.update({
            region: config.aws_region,
            accessKeyId: config.aws_accessKeyId,
            secretAccessKey: config.aws_secretAccessKey,
        });
    }
}
const AWSControllerS3 = S3Controller.getInstance();
exports.default = AWSControllerS3;
