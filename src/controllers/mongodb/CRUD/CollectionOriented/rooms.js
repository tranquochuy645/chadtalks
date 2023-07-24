"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const generic_1 = require("./generic");
/**
* Room class representing a room object.
*/
class Room {
    /**
     * Create a new Room object.
     * @param creator - The ID of the user creating the room (room owner).
     * @param invited - An array of user IDs to invite to the room.
     * @param type - Optional. The type of the room. Default is "default".
     */
    constructor(creator, invited, type = "default") {
        if (!mongodb_1.ObjectId.isValid(creator))
            throw new Error("Invalid creator user id");
        // Validate the type field to allow only "global" or "default"
        if (type !== "global" && type !== "default") {
            throw new Error("Invalid value for 'type' field. It should be 'global' or 'default'.");
        }
        this.type = type;
        this.invited = invited.map(id => {
            if (!mongodb_1.ObjectId.isValid(id))
                throw new Error("Invalid invited id");
            return new mongodb_1.ObjectId(id);
        });
        this.participants = [new mongodb_1.ObjectId(creator)];
        this.messages = [];
        this.isMeeting = false; // Set the default value for isMeeting
        this.meeting_uuid = null; // Set the default value for meeting_uuid
    }
}
/**
 * RoomsController class for handling room-related operations.
 */
class RoomsController extends generic_1.CollectionReference {
    /**
     * Create a new room.
     * @param newRoom - The room object to be created.
     * @returns A Promise resolving to the inserted room objectId
     */
    async createRoom(creator, invited, type = "default") {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.insertOne(new Room(creator, invited, type)));
            if (result && result.insertedId) {
                return result.insertedId;
            }
            throw new Error("Room insertion failed.");
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Retrieve the participant lists for rooms matching the filter.
     * @param filter - The filter criteria to find rooms.
     * @returns A Promise resolving to an array of room objects.
     * @throws Error if the room is not found or the user is not a member of the room.
     */
    async getParticipantLists(filter) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.find(filter, {
                projection: {
                    _id: 1,
                    participants: 1
                }
            }).toArray());
            if (!result) {
                throw new Error("Room not found || Not a member of the room");
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Retrieve the room details for the given room ID and user.
     * @param whoSearch - The user searching for the room.
     * @param roomId - The ID of the room to retrieve.
     * @param messagesLimit - The limit of messages to retrieve.
     * @param skip - Optional. The number of messages to skip from the beginning.
     * @returns A Promise resolving to the room details object.
     * @throws Error if the room is not found or the user is not a member of the room.
     */
    async getRoom(whoSearch, roomId, messagesLimit, skip) {
        var _a;
        try {
            const room = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.findOne({
                _id: new mongodb_1.ObjectId(roomId),
                participants: new mongodb_1.ObjectId(whoSearch)
            }, {
                projection: {
                    _id: 0,
                    participants: 1,
                    messages: {
                        $slice: Number.isInteger(skip) ? [skip, messagesLimit] : -messagesLimit
                    },
                    conversationLength: { $cond: { if: { $isArray: "$messages" }, then: { $size: "$messages" }, else: "NA" } },
                    isMeeting: 1,
                    meeting_uuid: 1
                }
            }));
            if (!room) {
                throw new Error("Room not found or user is not a member of the room");
            }
            return room;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Add a user to the invited list of a room.
     * @param userId - The ID of the user to add to the invited list.
     * @param roomId - The ID of the room.
     * @returns A Promise resolving to the count of modified documents.
     */
    async pushToInvitedList(userId, roomId) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({
                _id: new mongodb_1.ObjectId(roomId)
            }, {
                $push: {
                    invited: new mongodb_1.ObjectId(userId)
                }
            }));
            return result === null || result === void 0 ? void 0 : result.modifiedCount;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Remove a user from the invited list of a room.
     * @param whoAsked - The ID of the user requesting the removal.
     * @param roomId - The ID of the room.
     * @returns A Promise resolving to the count of modified documents.
     */
    async pullFromInvitedList(whoAsked, roomId) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({
                _id: new mongodb_1.ObjectId(roomId)
            }, {
                $pull: {
                    invited: new mongodb_1.ObjectId(whoAsked)
                }
            }));
            return result === null || result === void 0 ? void 0 : result.modifiedCount;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Add a participant to a room and remove them from the invited list.
     * @param whoAsked - The ID of the user requesting the addition.
     * @param roomId - The ID of the room.
     * @returns A Promise resolving to the count of modified documents.
     */
    async addParticipant(whoAsked, roomId) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({
                _id: new mongodb_1.ObjectId(roomId)
            }, {
                $push: { participants: new mongodb_1.ObjectId(whoAsked) },
                $pull: { invited: new mongodb_1.ObjectId(whoAsked) }
            }));
            return result === null || result === void 0 ? void 0 : result.modifiedCount;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Remove a user from all rooms where they are present as a participant or invited.
     * @param userId - The ID of the user to be removed from rooms.
     * @returns A Promise resolving to the count of modified documents.
     */
    async removeUserFromAllRooms(userId) {
        var _a, _b;
        try {
            // Filter to find rooms where the user is a participant or invited
            const filter = {
                $or: [
                    { participants: new mongodb_1.ObjectId(userId) },
                    { invited: new mongodb_1.ObjectId(userId) }
                ]
            };
            // Update operation to remove the user from participants and invited arrays
            const update = {
                $pull: {
                    participants: new mongodb_1.ObjectId(userId),
                    invited: new mongodb_1.ObjectId(userId),
                },
            };
            // Use find to get all matching rooms
            const rooms = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.find(filter, { projection: { _id: 1 } }).toArray());
            let modifiedCount = 0;
            // Use a for...of loop to ensure each update operation is executed sequentially
            for (const room of rooms) {
                const result = await ((_b = this._collection) === null || _b === void 0 ? void 0 : _b.updateOne({ _id: new mongodb_1.ObjectId(room._id) }, update));
                if (result === null || result === void 0 ? void 0 : result.modifiedCount) {
                    modifiedCount += result.modifiedCount;
                }
            }
            return modifiedCount;
        }
        catch (err) {
            throw err;
        }
    }
    /**
    * Set the meeting status and UUID for a room.
    * @param roomId - The ID of the room.
    * @param uuid - Optional. The UUID of the meeting.
    *              If uuid is not provided, isMeeting is set to false, and the current UUID will be removed.
    *              Otherwise, a new UUID will be set, and isMeeting will be set to true.
    * @returns A Promise resolving to the count of modified documents.
    */
    setMeeting(roomId, uuid) {
        var _a, _b;
        if (uuid)
            return (_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: new mongodb_1.ObjectId(roomId) }, { $set: { isMeeting: true, meeting_uuid: uuid } });
        return (_b = this._collection) === null || _b === void 0 ? void 0 : _b.updateOne({ _id: new mongodb_1.ObjectId(roomId) }, { $set: { isMeeting: false, meeting_uuid: null } });
    }
    /**
   * Save a message in a room.
   * @param sender - The ID of the message sender.
   * @param roomId - The ID of the room.
   * @param content - The content of the message.
   * @param timestamp - The timestamp of the message.
   * @throws Error if there's an issue while saving the message.
   */
    async saveMessage(sender, roomId, content, timestamp) {
        var _a;
        try {
            const data = {
                sender: new mongodb_1.ObjectId(sender),
                content,
                timestamp
            };
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: new mongodb_1.ObjectId(roomId) }, { $push: { messages: data } }));
            console.log("Saved message: " + (result === null || result === void 0 ? void 0 : result.modifiedCount));
        }
        catch (e) {
            console.error("Error saving message: " + e);
        }
    }
}
exports.default = RoomsController;
