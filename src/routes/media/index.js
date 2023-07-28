"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterMediaAccess_1 = require("../../middlewares/express/filterMediaAccess");
const filterMediaAdmin_1 = require("../../middlewares/express/filterMediaAdmin");
const multerUpload_1 = require("../../middlewares/express/multerUpload");
const express_1 = require("express");
const path_1 = require("path");
const stream_1 = require("stream");
const fs_1 = require("fs");
const router = (0, express_1.Router)();
// GET /media/:userId/:roomId/:filename?token=<token>
router.get('/:userId/:roomId/:filename', filterMediaAccess_1.filterMediaAccess, // Middleware to check access to the media
(req, res) => {
    // Ensure that the filename is properly sanitized to prevent directory traversal attacks
    // Remove any ".." to prevent traversal
    const filename = req.params.filename.replace(/\.\.\//g, '');
    const filePath = (0, path_1.resolve)('./media', req.params.userId, req.params.roomId, filename);
    const r = (0, fs_1.createReadStream)(filePath); // get a readable stream
    const ps = new stream_1.Stream.PassThrough();
    stream_1.Stream.pipeline(r, ps, (err) => {
        if (err) {
            console.error(err);
            return res.status(404).send("Media file not found");
        }
    });
    ps.pipe(res);
});
// POST /media/:userId/:roomId
router.post('/:userId/:roomId', filterMediaAdmin_1.filterMediaAdmin, // Middleware to check if user has admin access
(req, res) => {
    try {
        const count = Number(req.query.count);
        if (count === 1) {
            (0, multerUpload_1.multerUpload)(req, res, (error) => {
                if (error) {
                    return res.status(400).json({ message: 'Error uploading the file.', error: error.message });
                }
                if (!req.file) {
                    throw new Error("Missing file path");
                }
                // File uploaded successfully
                res.status(200).json({ message: 'File uploaded successfully', urls: [req.file.path] });
            });
        }
        else if (count > 1) {
            (0, multerUpload_1.multerUploadMany)(req, res, (error) => {
                if (error) {
                    return res.status(400).json({ message: 'Error uploading files.', error: error.message });
                }
                const fileUrls = Array.isArray(req.files) && req.files.map((file) => file.path);
                if (!fileUrls) {
                    throw new Error("Missing files path");
                }
                // Files uploaded successfully
                res.status(200).json({ message: 'Files uploaded successfully', urls: fileUrls });
            });
        }
        else {
            // Invalid 'count' value
            res.status(400).json({ message: 'Invalid "count" value. It should be a positive integer.' });
        }
    }
    catch (error) {
        console.error('Error uploading file(s):', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Route to handle all other all requests to /media/* (if doesnt match all routes above)
router.all('/*', (req, res) => {
    res.status(404).send("Media file not found");
});
exports.default = router;
