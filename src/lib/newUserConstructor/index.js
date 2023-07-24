"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, password, fullname, avatar, isOnline, invitations, rooms, createdAt) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.avatar = avatar;
        this.isOnline = isOnline;
        this.invitations = invitations;
        this.rooms = rooms;
        this.createdAt = createdAt;
    }
}
exports.default = User;
