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
const mongodb_1 = require("mongodb");
const generic_1 = require("./generic");
/**
 * Represents a media document.
 */
class Media {
    /**
     * Create a new Media object.
     * @param mediaUrl - The URL or location of the media.
     * @param mediaType - The type of media (e.g., "image", "video", "audio", etc.).
     * @param metadata - Metadata associated with the media (uploaderId, privacy, and uploadTimestamp are required).
     *                  Optionally, specify allowedUsers for private media to specify who can access it.
     */
    constructor(mediaUrl, mediaType, metadata) {
        // Ensure that uploaderId, privacy, and uploadTimestamp are provided in the metadata
        const { uploaderId, privacy, uploadTimestamp } = metadata, additionalMetadata = __rest(metadata, ["uploaderId", "privacy", "uploadTimestamp"]);
        if (!mongodb_1.ObjectId.isValid(uploaderId)) {
            throw new Error("Invalid uploaderId.");
        }
        if (!privacy || !uploadTimestamp) {
            throw new Error("Privacy and uploadTimestamp are required in metadata.");
        }
        // Validate privacy field to contain only valid values
        if (privacy !== "public" && privacy !== "private") {
            throw new Error("Invalid value for privacy field. It should be 'public' or 'private'.");
        }
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
        this.metadata = Object.assign({ uploaderId,
            privacy,
            uploadTimestamp }, additionalMetadata);
    }
}
/**
 * A controller for handling media operations and interactions with the media collection.
 */
class MediaController extends generic_1.CollectionReference {
    /**
     * Save media in the media collection.
     * @param mediaUrl - The URL or location of the media.
     * @param mediaType - The type of media (e.g., "image", "video", "audio", etc.).
     * @param metadata - Metadata associated with the media (uploaderId, privacy, and uploadTimestamp are required).
     *                  Optionally, specify allowedUsers for private media to specify who can access it.
     * @returns A Promise resolving to the ID of the inserted media document.
     * @throws Error if the media insertion fails or metadata is invalid.
     */
    async saveMedia(mediaUrl, mediaType, metadata) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.insertOne(new Media(mediaUrl, mediaType, metadata)));
            // Return the inserted ID
            if (result && result.insertedId) {
                return result.insertedId;
            }
            throw new Error("Media insertion failed.");
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Get media by its ID.
     * @param mediaId - The ID of the media document to retrieve.
     * @param whoAsked - The ID of the user requesting the media (optional).
     * @returns A Promise resolving to the media document (including media data and metadata).
     *          Returns null if the media with the provided ID is not found or access is denied.
     * @throws Error if the mediaId or whoAsked is invalid.
     */
    async getMediaById(mediaId, whoAsked) {
        var _a, _b, _c, _d;
        if (!mongodb_1.ObjectId.isValid(mediaId)) {
            throw new Error("Invalid mediaId.");
        }
        if (!whoAsked) {
            // If whoAsked is not provided, only return the public media document
            return (_a = this._collection) === null || _a === void 0 ? void 0 : _a.findOne({
                _id: new mongodb_1.ObjectId(mediaId),
                "metadata.privacy": "public",
            });
        }
        if (!mongodb_1.ObjectId.isValid(whoAsked)) {
            throw new Error("Invalid user ID.");
        }
        // If whoAsked is provided, check the privacy and allowedUsers before returning the media document
        const media = await ((_b = this._collection) === null || _b === void 0 ? void 0 : _b.findOne({
            _id: new mongodb_1.ObjectId(mediaId),
        }));
        if (!media) {
            return null; // Media not found
        }
        if (((_c = media.metadata) === null || _c === void 0 ? void 0 : _c.privacy) === "private") {
            // Check if the user is allowed to access private media
            const allowedUsers = (_d = media.metadata) === null || _d === void 0 ? void 0 : _d.allowedUsers;
            if (!allowedUsers || !allowedUsers.includes(new mongodb_1.ObjectId(whoAsked))) {
                return null; // Access denied for private media
            }
        }
        return media;
    }
    /**
     * Renew the URL or location of the media.
     * @param mediaId - The ID of the media document to update.
     * @param newUrl - The new URL or location to set for the media.
     * @returns A Promise resolving to the number of modified documents (1 if successful, 0 if not found).
     * @throws Error if the mediaId is invalid.
     */
    async renewUrl(mediaId, newUrl) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: new mongodb_1.ObjectId(mediaId) }, { mediaUrl: newUrl }));
            return result.modifiedCount || 0;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = MediaController;
