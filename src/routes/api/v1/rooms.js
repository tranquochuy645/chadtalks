"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const jwt_1 = require("../../../middlewares/express/jwt");
const mongodb_2 = require("../../../controllers/mongodb");
const socket_1 = require("../../../controllers/socket");
const router = (0, express_1.Router)();
// GET /api/v1/rooms/
// Description: This endpoint returns a list of room information that the authenticated user has access to.
// Access: Requires a valid access token. The user must be authenticated.
/**
 * Get a list of room information for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves to sending the response with the room information.
 */
router.get('/', jwt_1.verifyToken, async (req, res) => {
    try {
        const userId = req.headers.userId;
        // Retrieve the rooms' information for the user using the data controller.
        const roomsInfo = await mongodb_2.chatAppDbController.users.extractRoomsList(userId);
        // If no rooms found, respond with a 404 status and a corresponding message.
        if (!roomsInfo || roomsInfo.length === 0) {
            return res.status(404).json({ message: "User not found or no rooms available" });
        }
        // Respond with a 200 status and the retrieved room information.
        res.status(200).json(roomsInfo);
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        // If an error occurs, respond with a 500 status and an error message.
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// The 'extractRoomsList' method from the 'dc.users' data controller is responsible for extracting the list of rooms
// associated with the user, including participant details and meeting information. The result is sent as a JSON
// response with a 200 status on success. If the user is not found or no rooms are available, a 404 status with a
// corresponding message is returned. Any other errors during the process will result in a 500 status and an error
// message sent as the response.
// GET /api/v1/rooms/:id
// Description: This endpoint returns the messages of a specific room that the authenticated user has access to.
// Access: Requires a valid access token. The user must be authenticated.
/**
 * Get messages of a specific room for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves to sending the response with the room messages.
 */
router.get('/:id', jwt_1.verifyToken, async (req, res) => {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongodb_1.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "ID passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
        });
    }
    // Parse the 'skip' parameter from the query string. Default to 0 if not provided or invalid.
    const skip = parseInt(req.query.skip, 10);
    // Parse the 'limit' parameter from the query string. Default to 30 if not provided or invalid.
    const limit = parseInt(req.query.limit, 10) || 30;
    try {
        // Retrieve the messages for the specified room, limited by 'limit' and skipped by 'skip', using the data controller.
        const data = await mongodb_2.chatAppDbController.rooms.getConversationData(req.headers.userId, req.params.id, limit, skip);
        // If the user is not a member of this room or the room is not found, respond with a 404 status and a corresponding message.
        if (!data) {
            throw new Error('Room not found or not a member of this room');
        }
        // Respond with a 200 status and the retrieved room messages.
        res.status(200).json(data);
        //signal for client to refresh this room data
        socket_1.ioController.io.to(req.params.id).emit('seen', [req.params.id, req.headers.userId, new Date()]);
        mongodb_2.chatAppDbController.rooms.updateReadCursor(req.params.id, req.headers.userId, new Date());
    }
    catch (err) {
        console.error(err);
        // If an error occurs during the process, respond with a 404 status and an error message.
        res.status(404).json({ message: 'Room not found' });
    }
});
// The 'ObjectId.isValid' check verifies if the provided ID is a valid MongoDB ObjectId format.
// The 'skip' and 'limit' parameters can be provided in the query string to paginate the results.
// The 'getMessages' method from the 'dc.rooms' data controller is responsible for retrieving the messages for the
// specified room and user, limited by 'limit' and skipped by 'skip'. The result is sent as a JSON response with a
// 200 status on success. If the room is not found, the user is not a member of the room, or there are no messages,
// a 404 status with a corresponding message is returned. Any other errors during the process will also result in a
// 404 status and an error message sent as the response.
// POST /api/v1/rooms
// Description: This endpoint allows authenticated users to create a new room and invite other users to join.
// Access: Requires a valid access token. The user must be authenticated.
/**
 * Create a new room and invite other users to join.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves to sending the response after creating the room.
 */
router.post('/', jwt_1.verifyToken, async (req, res) => {
    try {
        // Get the creator's user ID from the request headers.
        const creator_userId = req.headers.userId;
        // Check if the creator's user ID is a valid MongoDB ObjectId.
        if (!mongodb_1.ObjectId.isValid(creator_userId)) {
            throw new Error("Invalid user ID");
        }
        // Map the invited user IDs to MongoDB ObjectId format and validate each ID.
        const oIdList = req.body.invited.map((id) => {
            if (mongodb_1.ObjectId.isValid(id)) {
                return new mongodb_1.ObjectId(id);
            }
            throw new Error("Invalid invited user ID");
        });
        // Create a new room with the creator's user ID and the list of invited users using the data controller.
        const insertedRoom = await mongodb_2.chatAppDbController.rooms.createRoom(creator_userId, req.body.invited);
        // Check if the room was successfully created.
        if (!insertedRoom) {
            throw new Error("Failed to create the room");
        }
        // Update the creator's rooms list to include the newly created room.
        const updateCreatorRoomsList = await mongodb_2.chatAppDbController.users.joinRoom(creator_userId, insertedRoom.toString());
        // Check if the creator's rooms list was updated successfully.
        if (!updateCreatorRoomsList) {
            throw new Error("Error updating the creator's rooms list");
        }
        // Update the invitation list of the invited users to include the newly created room.
        const updateUsersInvitationList = await mongodb_2.chatAppDbController.users.updateMany({ _id: { $in: oIdList } }, { $addToSet: { invitations: insertedRoom } });
        // Check if the invitation list of the invited users was updated successfully.
        if (updateUsersInvitationList !== oIdList.length) {
            throw new Error("Error updating the invitation lists of the invited users");
        }
        // Add the creator to the socket.io room for the new room.
        socket_1.ioController.addToRoom(creator_userId, insertedRoom.toString());
        // Emit a 'room' event to the creator's socket.io room to signal refreshing the rooms list.
        socket_1.ioController.io.to(creator_userId).emit('room');
        // Respond with a 200 status and a success message after successfully creating the room and updating the users' lists.
        res.status(200).json({ message: "Created Room Successfully" });
    }
    catch (err) {
        console.error(err);
        // If any error occurs during the process, respond with a 400 status and an error message.
        res.status(400).json({ message: 'Bad Request' });
    }
});
// The endpoint allows the authenticated user to create a new room and invite other users to join.
// The 'creator_userId' is obtained from the request headers, and it is used to identify the user who created the room.
// The 'ObjectId.isValid' check is used to validate that the user IDs provided are in the valid MongoDB ObjectId format.
// The 'dc.rooms.createRoom' method from the data controller 'dc.rooms' is responsible for creating the new room and
// adding the invited users to the invitation list. The result is checked to ensure that the room was successfully created.
// The 'dc.users.joinRoom' method from the data controller 'dc.users' is used to add the creator to the newly created room.
// The 'dc.users.updateMany' method from the data controller 'dc.users' is used to update the invitation list of the
// invited users to include the new room. The result is checked to ensure that all users' invitation lists were updated.
// If any error occurs during the process, a 400 status is returned with an error message.
// If the room and the users' lists are successfully updated, a 200 status is returned with a success message.
// PUT /api/v1/rooms/:id
// Description: This endpoint allows authenticated users to perform actions related to a room, such as joining, refusing, or leaving the room.
// Access: Requires a valid access token. The user must be authenticated.
/**
 * Perform actions related to a room, such as joining, refusing, or leaving the room.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves to sending the response after performing the requested action.
 */
router.put('/:id', jwt_1.verifyToken, async (req, res) => {
    try {
        // Check if the room ID is a valid MongoDB ObjectId.
        if (!mongodb_1.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "ID passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
            });
        }
        // Get the action requested by the user from the request body.
        switch (req.body.action) {
            case 'join':
                // Add the user to the room's participants list using the 'dc.rooms.addParticipant' method.
                const addOk = await mongodb_2.chatAppDbController.rooms.addParticipant(req.headers.userId, req.params.id);
                if (!addOk) {
                    return res.status(403).json({ message: "Not invited" });
                }
                // Add the user to the room's participants list.
                const joinOk = await mongodb_2.chatAppDbController.users.joinRoom(req.headers.userId, req.params.id);
                if (!joinOk) {
                    throw new Error("Couldn't add to rooms list");
                }
                // Add the user to the socket.io room for the room.
                socket_1.ioController.addToRoom(req.headers.userId, req.params.id);
                // Emit a 'room' event to the user's socket.io room to signal refreshing the rooms list.
                socket_1.ioController.io.to(req.headers.userId).emit('room');
                // Respond with a 200 status and a success message after successfully joining the room.
                return res.status(200).json({ message: "ok" });
            case 'refuse':
                // Remove the room ID from the user's invited list using the 'dc.rooms.pullFromInvitedList' method.
                const roomPullCount = await mongodb_2.chatAppDbController.rooms.pullFromInvitedList(req.headers.userId, req.params.id);
                if (!roomPullCount) {
                    // If the user was not invited to the room or is not a member of this room, respond with a 403 status.
                    return res.status(403).json({ message: 'Not invited' });
                }
                // Remove the room ID from the user's invitations list using the 'dc.users.pullFromInvitationsLists' method.
                const userPullCount = await mongodb_2.chatAppDbController.users.pullFromInvitationsLists([req.headers.userId], req.params.id);
                if (!userPullCount) {
                    // If the user was not invited to the room or is not a member of this room, respond with a 403 status.
                    return res.status(403).json({ message: 'Not invited' });
                }
                // Respond with a 200 status and a success message after successfully refusing the room invitation.
                return res.status(200).json({ message: "ok" });
            case 'leave':
                // Remove the user from the room's participants list using the 'dc.rooms.removeParticipant' method.
                const removed = await mongodb_2.chatAppDbController.rooms.removeParticipant(req.headers.userId, req.params.id);
                if (!removed) {
                    // If the user is not a member of this room, respond with a 403 status.
                    return res.status(403).json({ message: 'Not a member of this room' });
                }
                // Remove the room ID from the user's rooms list using the 'dc.users.leaveRoom' method.
                mongodb_2.chatAppDbController.users.leaveRoom(req.headers.userId, req.params.id);
                // Remove the user from the socket.io room for the room.
                socket_1.ioController.removeFromRoom(req.headers.userId, req.params.id);
                // Signal to refresh
                socket_1.ioController.io.to(req.headers.userId).emit('room');
                // Respond with a 200 status and a success message after successfully leaving the room.
                return res.status(200).json({ message: "ok" });
            default:
                // If the requested action is not recognized, respond with a 500 status and an error message.
                return res.status(400).json({ message: 'Unknown action' });
        }
    }
    catch (err) {
        console.error(err);
        // If any error occurs during the process, respond with a 500 status and an error message.
        res.status(500).json({ message: err.message });
    }
});
// The endpoint allows the authenticated user to perform actions related to a room, such as joining, refusing, or leaving the room.
// The 'ObjectId.isValid' check is used to validate that the room ID provided is in the valid MongoDB ObjectId format.
// The 'req.body.action' is used to determine the action requested by the user (join, refuse, or leave).
// Depending on the action, different methods from the data controllers 'dc.rooms' and 'dc.users' are used to update the room and user data.
// If the requested action is not recognized, a 500 status is returned with an error message.
// If the requested action is successfully performed, a 200 status is returned with a success message.
// If any error occurs during the process, a 500 status is returned with an error message.
// DELETE /api/v1/rooms/:id
// Description: This endpoint allows authenticated users to delete a room by its ID.
// Access: Requires a valid access token. The user must be authenticated.
/**
 * Delete a room by its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves to sending the response after deleting the room.
 */
router.delete('/:id', jwt_1.verifyToken, async (req, res) => {
    var _a;
    try {
        // Check if the room ID is a valid MongoDB ObjectId.
        if (!mongodb_1.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "ID passed in must be a string of 12 bytes or a string of 24 hex characters or an integer",
            });
        }
        // Get room information using the provided room ID.
        const roomInfo = await mongodb_2.chatAppDbController.rooms.getRoomsInfo([new mongodb_1.ObjectId(req.params.id)]);
        // Perform clean-up tasks for participants of the room.
        if (roomInfo && roomInfo.length > 0) {
            const participants = (_a = roomInfo[0].participants) === null || _a === void 0 ? void 0 : _a.map((oid) => oid.toString());
            participants.forEach((id) => {
                mongodb_2.chatAppDbController.users.leaveRoom(id, req.params.id);
                socket_1.ioController.io.to(id).emit('room');
                socket_1.ioController.removeFromRoom(id, req.params.id);
            });
        }
        // Delete the room using the 'dc.rooms.deleteRoom' method.
        const deleted = await mongodb_2.chatAppDbController.rooms.deleteRoom(req.params.id, req.headers.userId);
        switch (deleted) {
            case 200:
                // Respond with a 200 status and a success message after successfully deleting the room.
                return res.status(deleted).json({ message: "Deleted room successfully" });
            case 404:
                // If the room is not found, respond with a 404 status and an error message.
                return res.status(deleted).json({ message: "Room not found" });
            case 403:
                // If the user does not have permission to delete the room, respond with a 403 status and an error message.
                return res.status(deleted).json({ message: "You do not have permission to delete this room" });
            default:
                // If an unknown error occurs during the process, throw an error.
                throw new Error("Unknown error");
        }
    }
    catch (err) {
        console.error(err);
        // If any error occurs during the process, respond with a 500 status and an error message.
        return res.status(500).json({ message: err.message });
    }
});
// The endpoint allows the authenticated user to delete a room by its ID.
// The 'ObjectId.isValid' check is used to validate that the room ID provided is in the valid MongoDB ObjectId format.
// The 'dc.rooms.getRoomsInfo' method is used to retrieve room information, including the list of participants, for clean-up tasks.
// Clean-up tasks involve removing participants from the room's socket.io room and their room lists.
// The 'dc.rooms.deleteRoom' method is used to delete the room from the database.
// Depending on the result of the delete operation, different responses are sent back to the user.
// If the room is successfully deleted, a 200 status is returned with a success message.
// If the room is not found, a 404 status is returned with an error message.
// If the user does not have permission to delete the room, a 403 status is returned with an error message.
// If any error occurs during the process, a 500 status is returned with an error message.
exports.default = router;
