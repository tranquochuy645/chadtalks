"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../../../middlewares/express/jwt");
const mongodb_1 = require("../../../controllers/mongodb");
const mongodb_2 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleUpdatePassword_1 = require("../../../middlewares/express/handleUpdatePassword");
const router = (0, express_1.Router)();
/**
 * Route to get the user's own profile information.
 * @route GET /api/v1/users
 * @middleware verifyToken - Middleware to verify the user's access token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} - A Promise that resolves to the user's profile information.
 */
router.get('/', jwt_1.verifyToken, async (req, res) => {
    try {
        const data = await mongodb_1.chatAppDbController.users.readProfile(req.headers.userId);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
/**
 * Route to retrieve a user's invitations.
 * @route GET /invitations
 * @middleware verifyToken - Middleware to verify the user's token.
 */
router.get('/invitations', jwt_1.verifyToken, async (req, res) => {
    try {
        // Extract user invitations using the data controller
        const data = await mongodb_1.chatAppDbController.users.extractInvitationsList(req.headers.userId);
        // Respond with the extracted invitations
        res.status(200).json(data);
    }
    catch (err) {
        // Handle errors and respond with an error message
        res.status(500).json({ message: err.message });
    }
});
/**
 * Route to get the short profile information of a specific user.
 * @route GET /api/v1/users/:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} - A Promise that resolves to the short profile information of the requested user.
 */
router.get('/:id', async (req, res) => {
    try {
        if (!mongodb_2.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "ID passed in must be a string of 12 bytes or a string of 24 hex characters or an integer" });
        }
        const data = await mongodb_1.chatAppDbController.users.readShortProfile(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
/**
 * Route to update user profile information.
 * @route PUT /api/v1/users/
 * @middleware verifyToken - Middleware to verify the user's access token.
 * @middleware handleUpdatePassword - Middleware for handling password updates securely.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} - A Promise that resolves to a response object with a success message or an error message.
 */
router.put('/', jwt_1.verifyToken, handleUpdatePassword_1.handleUpdatePassword, async (req, res) => {
    try {
        // Extract the update data from req.body
        const updateData = req.body;
        if (updateData.password) {
            if (!updateData.current_password) {
                return res.status(400).json({ message: 'Missing current password' });
            }
            const user = await mongodb_1.chatAppDbController.users.getPassword(undefined, req.headers.userId);
            const compResult = await bcrypt_1.default.compare(updateData.current_password, user.password);
            if (!compResult) {
                return res.status(403).json({ message: "Password mismatch" });
            }
        }
        const result = await mongodb_1.chatAppDbController.users.updateUser(req.headers.userId, updateData);
        if (result) {
            return res.status(200).json({ message: 'User updated successfully' });
        }
        res.status(400).json({ message: 'Invalid update fields || no field changed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
/**
 * Route to delete a user account.
 * @route DELETE /api/v1/users/:id
 * @middleware verifyToken - Middleware to verify the user's access token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<Object>} - A Promise that resolves to a response object with a success message or an error message.
 */
router.delete('/', jwt_1.verifyToken, async (req, res) => {
    try {
        const userId = req.headers.userId;
        const password = req.body.password;
        if (!password) {
            return res.status(401).json({ message: 'Missing password' });
        }
        const user = await mongodb_1.chatAppDbController.users.getPassword(undefined, userId);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        if (!user.password) {
            throw new Error("password doesn't exist in the database");
        }
        const compResult = await bcrypt_1.default.compare(password, user.password);
        if (!compResult) {
            return res.status(403).json({ message: "Password mismatch" });
        }
        await mongodb_1.chatAppDbController.rooms.removeUserFromAllRooms(userId);
        // Attempt to delete the user by ID
        const deletedCount = await mongodb_1.chatAppDbController.users.deleteUser(userId);
        // Check if a user was deleted (deletedCount > 0)
        if (deletedCount) {
            return res.status(200).json({ message: 'User deleted successfully' });
        }
        // No user found with the provided ID
        res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Other user-related routes...
exports.default = router;
