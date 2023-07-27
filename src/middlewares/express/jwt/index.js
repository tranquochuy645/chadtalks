"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const getTokenPayload_1 = require("../../../lib/getTokenPayload");
const verifyToken = (req, res, next) => {
    let type;
    try {
        type = req.headers.authorization.split(' ')[0];
    }
    catch (err) {
        return res.status(400).json({ message: 'Bad Request' });
    }
    if (type != "Bearer") {
        return res.status(401).json({ message: 'Invalid type' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        // No token provided
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    ;
    try {
        const { uid } = (0, getTokenPayload_1.getTokenPayload)(token);
        req.headers.userId = uid;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
exports.verifyToken = verifyToken;
