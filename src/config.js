"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Create a configuration object using environment variables.
const conf = {
    jwt_key: process.env.JWT_KEY || "",
    mongo_uri: process.env.MONGO_URI || "",
    db_name: process.env.DB_NAME || "",
    port: process.env.PORT || "",
    service_account_email: process.env.SERVICE_ACCOUNT_EMAIL || "",
};
// Validate if any child property is null or undefined
// Loop through each property in the configuration object
for (const prop in conf) {
    // Check if the property exists in the object and its value is an empty string
    if (conf.hasOwnProperty(prop) && conf[prop] == "") {
        // If a property is missing or has an empty value, throw an error indicating the missing configuration
        // This will crash the app right away if any configuration is missing
        throw new Error(`Missing configuration: ${prop}`);
    }
}
// Export the configuration object.
exports.default = conf;
