"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.fullname = username;
        this.avatar = "";
        this.isOnline = false;
        this.invitations = [];
        this.rooms = [];
        this.createdAt = new Date();
    }
}
exports.default = User;
