"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class Media {
    constructor(mediaUrl, mediaType, metadata) {
        // Ensure that uploaderId, privacy, and uploadTimestamp are provided in the metadata
        const { uploaderId, privacy, uploadTimestamp } = metadata, additionalMetadata = __rest(metadata, ["uploaderId", "privacy", "uploadTimestamp"]);
        if (!uploaderId || !privacy || !uploadTimestamp) {
            throw new Error("uploaderId, privacy, and uploadTimestamp are required in metadata.");
        }
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
        this.metadata = Object.assign({ uploaderId,
            privacy,
            uploadTimestamp }, additionalMetadata);
    }
}
exports.default = Media;
