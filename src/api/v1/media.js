"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../../middlewares/express/jwt");
const router = (0, express_1.Router)();
// GET /api/v1/media/ 
// This endpoint returns list of rooms'info that the user has access to
router.get('/:id', jwt_1.verifyToken, async (req, res) => {
    try {
        const userId = req.headers.userId; // the user who asking for this media
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
