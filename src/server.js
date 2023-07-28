"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the Express app instance from app.ts
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const mongodb_1 = require("./controllers/mongodb");
const socket_1 = require("./controllers/socket");
const config_1 = __importDefault(require("./config"));
// Set the default port to 443 or the value specified in the config file
const port = config_1.default.port || 443;
// Database options (if needed)
const dbOpts = {};
// Function to initialize the application
const RUN = async () => {
    // Initialize the MongoDB database with the specified URI and database name
    await mongodb_1.chatAppDbController.init(config_1.default.mongo_uri, config_1.default.db_name, dbOpts);
    // Only start the server after the database is initialized
    const server = (0, http_1.createServer)(app_1.default);
    // Initialize the socket.io controller with the HTTP server and the database controller
    socket_1.ioController.init(server, mongodb_1.chatAppDbController);
    // Start listening on the specified port for incoming requests
    server.listen(port);
};
// Call the RUN function to start the application
RUN();
