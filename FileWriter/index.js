"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class FileWriter {
    /**
     * Write data to a file in the prefixed directory.
     * @param subPath - The sub path inside the prefixed directory where the file will be written.
     * @param data - The data to be written to the file. It can be a string or a Buffer (array buffer view).
     */
    static write(subPath, data) {
        try {
            const filePath = (0, path_1.resolve)(subPath);
            // Ensure the directory exists before writing the file
            const directory = (0, path_1.dirname)(filePath);
            if (!(0, fs_1.existsSync)(directory)) {
                (0, fs_1.mkdirSync)(directory, { recursive: true });
            }
            (0, fs_1.writeFileSync)(filePath, data);
            console.log(`File written successfully to: ${filePath}`);
        }
        catch (error) {
            console.error('Error writing the file:', error);
        }
    }
}
exports.FileWriter = FileWriter;
