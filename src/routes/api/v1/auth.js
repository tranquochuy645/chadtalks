"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateAuthToken_1 = require("../../../lib/generateAuthToken");
const DefaultProfileImage_1 = require("../../../lib/DefaultProfileImage");
const handleRegPassword_1 = require("../../../middlewares/express/handleRegPassword");
const mongodb_1 = require("../../../controllers/mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// POST /api/v1/auth/register
router.post('/register', handleRegPassword_1.handleRegPassword, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Credentials Missing' });
        }
        const isAvailableUserName = await mongodb_1.chatAppDbController.users.checkAvailableUserName(username);
        if (isAvailableUserName) {
            const insertedUser = await mongodb_1.chatAppDbController.users.createUser(username, password);
            const avatar = new DefaultProfileImage_1.DefaultProfileImage(username.charAt(0)); // svg content
            const path = `media/${insertedUser.toString()}/public/avatar.svg`;
            avatar.write('./' + path);
            await mongodb_1.chatAppDbController.users.updateUser(insertedUser.toString(), {
                invitations: [mongodb_1.chatAppDbController.globalChatId],
                avatar: path
            });
            await mongodb_1.chatAppDbController.rooms.pushToInvitedList(insertedUser.toString(), mongodb_1.chatAppDbController.globalChatId.toString());
            return res.status(200).json({ message: 'Created account successfully' });
        }
        return res.status(409).json({ message: 'Username already exists' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Credentials Missing' });
        }
        const user = await mongodb_1.chatAppDbController.users.getPassword(username);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        if (!user.password) {
            throw new Error("password doesn't exist in the database");
        }
        const compResult = await bcrypt_1.default.compare(password, user.password);
        if (compResult) {
            const access_token = (0, generateAuthToken_1.generateAuthToken_v2)(user._id);
            return res.status(200).json({ access_token });
        }
        else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// POST /api/v1/auth/logout
router.post('/logout', (req, res) => {
    // Logout logic here
});
// Other authentication-related routes...
exports.default = router;
