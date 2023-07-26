"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
/**
 * RoomsExtractor class for extracting room data based on user ID.
 */
class RoomsExtractor {
    /**
     * Create a new RoomsExtractor instance.
     * @param usersController - The users controller instance.
     * @param roomsController - The rooms controller instance.
     */
    constructor(usersController, roomsController) {
        this._usersController = usersController;
        this._roomsController = roomsController;
    }
    /**
     * Extract room data based on the user ID.
     * @param userId - The user ID.
     * @returns A Promise resolving to the extracted room data.
     */
    async exec(userId) {
        try {
            const roomIds = await this._usersController.getRoomsList(userId);
            if (!roomIds) {
                return null;
            }
            let data = [];
            if (roomIds && roomIds.length > 0) {
                const roomsInfo = await this._roomsController.getRoomsInfo(roomIds);
                data = await Promise.all(roomsInfo.map(async (room) => {
                    const participantIds = room.participants;
                    const participants = await this._usersController.readManyShortProfiles({
                        _id: {
                            $in: participantIds.map((id) => new mongodb_1.ObjectId(id)),
                        },
                    });
                    const roomWithParticipantsData = Object.assign(Object.assign({}, room), { participants });
                    return roomWithParticipantsData;
                }));
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = RoomsExtractor;
