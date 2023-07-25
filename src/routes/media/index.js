"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const filterMediaAccess_1 = require("../../middlewares/express/filterMediaAccess");
const filterMediaAdmin_1 = require("../../middlewares/express/filterMediaAdmin");
const multerUpload_1 = require("../../middlewares/express/multerUpload");
const express_1 = require("express");
const path_1 = require("path");
const router = (0, express_1.Router)();
// GET /media/:userId/:roomId/:filename?token=<token>
router.get('/:userId/:roomId/:filename', filterMediaAccess_1.filterMediaAccess, (req, res) => {
    // Ensure that the filename is properly sanitized to prevent directory traversal attacks
    // Remove any ".." to prevent traversal
    const filename = req.params.filename.replace(/\.\.\//g, '');
    const filePath = (0, path_1.resolve)('./media', req.params.userId, req.params.roomId, filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.status(404).json({ message: 'Media file not found' });
            }
            else {
                // Other errors (e.g., file read error)
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    });
});
router.get('/*', (req, res) => {
    res.status(404).json({ message: "Media file not found" });
});
// POST /media/upload
// This endpoint handles file uploads
router.post('/:userId/:roomId', filterMediaAdmin_1.filterMediaAdmin, multerUpload_1.multerUpload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Check for any errors during file upload
        if (req.file instanceof multer_1.MulterError) {
            return res.status(400).json({ message: 'File upload error', error: req.file.message });
        }
        // Process the uploaded file using FileWriter or save it to a database
        // Respond with success message
        res.status(200).json({ message: 'File uploaded successfully', url: req.file.path });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
