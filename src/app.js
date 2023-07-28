"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const media_1 = __importDefault(require("./routes/media"));
const jsonFilter_1 = require("./middlewares/express/jsonFilter");
// Create an Express app instance
const app = (0, express_1.default)();
// Define the path to the public directory
const publicPath = path_1.default.resolve(__dirname, '../public');
// Define the path to the index.html file inside the public directory
const indexPath = path_1.default.join(publicPath, 'index.html');
// Serve static files from the public directory
app.use(express_1.default.static(publicPath));
// Mount the 'media' route for serving media files
app.use('/media', media_1.default);
// Mount the 'api' route with JSON parsing and error filtering middleware
app.use('/api', express_1.default.json(), jsonFilter_1.filterJsonError, api_1.default);
// For all other routes (not matched by the above routes), serve the index.html file
// This is for integrating with react-router or handling client-side routing
app.get('*', (req, res) => {
    res.sendFile(indexPath);
});
// Export the Express app
exports.default = app;
