"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const generic_1 = require("./generic");
class MediaController extends generic_1.CollectionReference {
    /**
     * Save media in the media collection.
         * @returns A Promise resolving to the ID of the inserted media document.
     */
    async saveMedia(media) {
        var _a;
        try {
            // Ensure that uploaderId, privacy, and uploadTimestamp are provided in the metadata
            // const { uploaderId, privacy, uploadTimestamp } = media.metadata;
            // if (!uploaderId || !privacy || !uploadTimestamp) {
            //     throw new Error("uploaderId, privacy, and uploadTimestamp are required in metadata.");
            // }
            // Already validated by the media constructor
            // Insert the document into the collection and retrieve the inserted ID
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.insertOne(media));
            // Return the inserted ID
            if (result && result.insertedId) {
                return result.insertedId;
            }
            else {
                throw new Error("Media insertion failed.");
            }
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
     */
    async getMediaById(mediaId, whoAsked) {
        var _a, _b, _c, _d;
        if (!mongodb_1.ObjectId.isValid(mediaId)) {
            throw new Error("Invalid media id");
        }
        if (!whoAsked) {
            // If whoAsked is not provided, only return the public media document
            return (_a = this._collection) === null || _a === void 0 ? void 0 : _a.findOne({
                _id: new mongodb_1.ObjectId(mediaId),
                "metadata.privacy": "public",
            });
        }
        if (!mongodb_1.ObjectId.isValid(whoAsked)) {
            throw new Error("Invalid user id");
        }
        // If whoAsked is provided, check the privacy before returning the media document
        const media = await ((_b = this._collection) === null || _b === void 0 ? void 0 : _b.findOne({
            _id: new mongodb_1.ObjectId(mediaId),
        }));
        if (!media) {
            return null; // Media not found
        }
        if (((_c = media.metadata) === null || _c === void 0 ? void 0 : _c.privacy) === "private" && ((_d = media.metadata) === null || _d === void 0 ? void 0 : _d.uploaderId.toString()) !== whoAsked) {
            return null; // Access denied for private media
        }
        return media;
    }
    async renewUrl(mediaId, newUrl) {
        var _a;
        try {
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: new mongodb_1.ObjectId(mediaId) }, { mediaUrl: newUrl }));
            return result.modifiedCount;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = MediaController;
