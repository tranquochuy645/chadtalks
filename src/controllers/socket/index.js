"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioController = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const jwt_1 = require("../../middlewares/socketIO/jwt");
const uuid_1 = require("uuid");
class SocketIOController {
    constructor() {
        this._io = null;
    }
    init(server, dc) {
        const io = new socket_io_1.default.Server(server);
        io.use(jwt_1.verifyTokenViaSocketIO);
        // Set up event handlers for socket connections
        io.on("connection", async (socket) => {
            var _a, _b;
            const userId = (_b = (_a = socket === null || socket === void 0 ? void 0 : socket.handshake) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.userId;
            if (!userId || typeof userId !== "string") {
                socket.emit("error", { message: "Invalid user" });
                return socket.disconnect();
            }
            let rooms;
            try {
                rooms = await dc.users.getRoomsList(userId) || [];
                rooms = rooms.map(room => room.toString());
                if (!rooms) {
                    throw new Error();
                }
            }
            catch (e) {
                return socket.disconnect();
            }
            socket.join(userId);
            dc.users.setStatus(userId, true);
            socket.emit("ok");
            console.log("A user connected");
            // Handle join meeting event
            socket.on("join_meet", async (initData) => {
                var _a;
                //initData: [ original chat room id , meeting uuid]
                if (!initData || initData.length != 2
                    || !initData[0] || !initData[1]
                    || !rooms.includes(initData[0])) {
                    return socket.disconnect();
                }
                socket.join(initData[1]);
                console.log("A user has joined meeting");
                socket.on("disconnect", () => {
                    var _a, _b;
                    io.to(initData[1]).emit('off_peer', socket.id);
                    console.log("A user has left meeting");
                    //if there is still user in this meeting, return
                    console.log((_a = io.sockets.adapter.rooms.get(initData[1])) === null || _a === void 0 ? void 0 : _a.size);
                    if ((_b = io.sockets.adapter.rooms.get(initData[1])) === null || _b === void 0 ? void 0 : _b.size)
                        return;
                    //else if all users has left the meeting
                    io.to(initData[0]).emit("end_meet", initData);
                    dc.rooms.setMeeting(initData[0]);
                });
                socket.on('offer', (msg) => {
                    //msg: [ target socket id, offer data]
                    socket.to(msg[0]).emit('offer', [socket.id, msg[1]]);
                });
                socket.on('answer', (msg) => {
                    //msg: [ target socket id, answer data]
                    socket.to(msg[0]).emit('answer', [socket.id, msg[1]]);
                });
                socket.on('ice_candidate', (msg) => {
                    //msg: [ target socket id, ice data]
                    socket.to(msg[0]).emit('ice_candidate', [socket.id, msg[1]]);
                });
                // When a user completed setup camera, they send "ok"
                // Announce that they have joined
                socket.to(initData[1]).emit('new_peer', socket.id);
                // Check if this is the first user in the meeting
                if (((_a = io.sockets.adapter.rooms.get(initData[1])) === null || _a === void 0 ? void 0 : _a.size) === 1) {
                    const meetingState = await dc.rooms.checkMeeting(initData[0]);
                    if ((meetingState === null || meetingState === void 0 ? void 0 : meetingState.isMeeting) === false && (meetingState === null || meetingState === void 0 ? void 0 : meetingState.meeting_uuid) === null) {
                        //This is the first user in the meeting
                        //anounce the room
                        socket.to(initData[0]).emit("meet", [userId, initData[0], initData[1], new Date()]);
                        // Set isMeeting to true and save uuid in db
                        dc.rooms.setMeeting(initData[0], initData[1]);
                    }
                }
            });
            // Handle join chat event
            socket.on('join_chat', async () => {
                var _a;
                console.log("A user has joined chat");
                rooms.length > 0 && rooms.forEach((room) => {
                    socket.join(room);
                });
                try {
                    if (!((_a = io.sockets.adapter.rooms.get(userId)) === null || _a === void 0 ? void 0 : _a.size)) {
                        // if this socket is the first socket of the user
                        await dc.users.setStatus(userId, true);
                        //Send online signal to all rooms of the user
                        rooms.forEach(room => socket.to(room).emit("onl", userId));
                    }
                    // Handle message event
                    socket.on("msg", (msg) => {
                        //msg: [room id, content, date, [urls] ]
                        console.log("msg:", msg);
                        io.to(msg[0]).emit("msg", [userId, msg[0], msg[1], msg[2]], msg[3]);
                        dc.rooms.saveMessage(userId, msg[0], msg[1], msg[2], msg[3]);
                    });
                    // Handle call event
                    socket.on("meet", async (msg) => {
                        //msg: [room id, date]
                        console.log("meet:", msg);
                        const meetingState = await dc.rooms.checkMeeting(msg[0]);
                        if ((meetingState === null || meetingState === void 0 ? void 0 : meetingState.isMeeting) && meetingState.meeting_uuid) {
                            //Just tell the client to refresh because something went wrong
                            //A meeting of that room is allready in progress
                            return socket.emit("room");
                        }
                        //Init a new meeting
                        const meeting_uuid = (0, uuid_1.v4)();
                        //Tell the client
                        socket.emit("meet", [userId, msg[0], meeting_uuid]);
                    });
                    socket.on("disconnect", async () => {
                        var _a;
                        console.log("A user has left chat");
                        // If the user has other socket connected,return
                        if ((_a = io.sockets.adapter.rooms.get(userId)) === null || _a === void 0 ? void 0 : _a.size)
                            return;
                        // All sockets of the user have been disconnected
                        // Send offline signal to all rooms of the user
                        rooms.forEach(room => io.to(room).emit("off", userId));
                        dc.users.setStatus(userId, false);
                        try {
                            await dc.users.setStatus(userId, false);
                        }
                        catch (error) {
                            console.error(error);
                        }
                    });
                }
                catch (error) {
                    console.error(error);
                    socket.emit("error", { message: "Internal Server Error" });
                    socket.disconnect();
                }
            });
            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });
        const invitations_update_pipeline = [
            {
                $match: {
                    'updateDescription.updatedFields.invitations': { $exists: true }
                }
            }
        ];
        const handleChange = (change) => {
            try {
                if (change.operationType == "update") {
                    const userId = change.documentKey._id.toString();
                    io.to(userId).emit('inv');
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        dc.watch("users", invitations_update_pipeline, handleChange);
        this._io = io;
    }
    /**
     * Add a user to a specified room by joining all their sockets to the room.
     *
     * @param {string} userId - The user ID of the user to be added to the room.
     * @param {string} roomId - The room ID of the room to which the user should be added.
     *
     * @example
     * // Add a user to a room
     * const userId = 'user123';
     * const roomId = 'room456';
     *
     * // Call the addToRoom() method to add the user with ID 'user123' to the room with ID 'room456'
     * ioController.addToRoom(userId, roomId);
     *
     * // Now, all sockets of the user 'user123' are joined to the room 'room456',
     * // and the user will receive events and messages related to that room.
     */
    addToRoom(userId, roomId) {
        var _a;
        // Get all the socket IDs of the user with the given userId
        (_a = this._io.sockets.adapter.rooms.get(userId)) === null || _a === void 0 ? void 0 : _a.forEach((socketId) => {
            var _a;
            // For each socket of the user, join them to the specified room
            (_a = this._io.sockets.sockets.get(socketId)) === null || _a === void 0 ? void 0 : _a.join(roomId);
        });
    }
    /**
     * Remove a user from a specified room by having all their sockets leave the room.
     *
     * @param {string} userId - The user ID of the user to be removed from the room.
     * @param {string} roomId - The room ID of the room from which the user should be removed.
     *
     * @example
     * // Remove a user from a room
     * const userId = 'user123';
     * const roomId = 'room456';
     *
     * // Call the removeFromRoom() method to remove the user with ID 'user123' from the room with ID 'room456'
     * ioController.removeFromRoom(userId, roomId);
     *
     * // Now, all sockets of the user 'user123' have left the room 'room456',
     * // and the user will no longer receive events and messages related to that room.
     */
    removeFromRoom(userId, roomId) {
        var _a;
        // Get all the socket IDs of the user with the given userId
        (_a = this._io.sockets.adapter.rooms.get(userId)) === null || _a === void 0 ? void 0 : _a.forEach((socketId) => {
            var _a;
            // For each socket of the user, make them leave the specified room
            (_a = this._io.sockets.sockets.get(socketId)) === null || _a === void 0 ? void 0 : _a.leave(roomId);
        });
    }
    // Allow direct access to the io instance
    get io() {
        if (this._io)
            return this._io;
        throw new Error("Socket io is not available");
    }
}
exports.default = SocketIOController;
Object.freeze(SocketIOController);
const ioController = new SocketIOController();
exports.ioController = ioController;
