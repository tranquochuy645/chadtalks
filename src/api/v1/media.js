"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const jwt_1 = require("../../middlewares/express/jwt");
const mongodb_2 = require("../../controllers/mongodb");
const router = (0, express_1.Router)();
// GET /api/v1/media/:id
// This endpoint returns list of rooms'info that the user has access to
router.get('/:id', jwt_1.verifyToken, async (req, res) => {
    try {
        if (!mongodb_1.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "ID passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
            });
        }
        const media = await mongodb_2.chatAppDbController.media.getMediaById(req.params.id, req.headers.userId);
        res.status(200).json(media);
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
