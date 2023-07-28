"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const mongodb_1 = require("./controllers/mongodb");
const socket_1 = require("./controllers/socket");
const config_1 = __importDefault(require("./config"));
const port = config_1.default.port || 443;
const dbOpts = {};
const RUN = async () => {
    await mongodb_1.chatAppDbController.init(config_1.default.mongo_uri, config_1.default.db_name, dbOpts);
    // Only start server after db is initialized
    const server = (0, http_1.createServer)(app_1.default);
    socket_1.ioController.init(server, mongodb_1.chatAppDbController);
    server.listen(port);
};
RUN();
