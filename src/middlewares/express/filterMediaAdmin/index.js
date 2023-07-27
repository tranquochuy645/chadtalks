"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMediaAdmin = void 0;
const getTokenPayload_1 = require("../../../lib/getTokenPayload");
const mongodb_1 = require("mongodb");
const mongodb_2 = require("../../../controllers/mongodb");
const filterMediaAdmin = async (req, res, next) => {
    if (!mongodb_1.ObjectId.isValid(req.params.userId)) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    if (!req.query.token) {
        return res.status(403).json({
            message: "Token is required",
        });
    }
    try {
        const { uid } = (0, getTokenPayload_1.getTokenPayload)(req.query.token);
        if (uid !== req.params.userId) {
            throw new Error("Not authorized");
        }
        if (req.params.roomId === 'public') {
            return next();
        }
        const rooms = await mongodb_2.chatAppDbController.users.getRoomsList(uid);
        if (!rooms || rooms.length == 0) {
            throw new Error("Not a member of the room");
        }
        if (rooms.includes(req.params.roomId)) {
            return next();
        }
        throw new Error("Not a member of the room");
    }
    catch (err) {
        res.status(403).json({ message: err.message });
    }
};
exports.filterMediaAdmin = filterMediaAdmin;
