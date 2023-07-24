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
class MediaController extends generic_1.CollectionReference {
    /**
     * Save media in the media collection.
     * @param mediaBuffer - The media data as a Buffer or Uint8Array.
     * @param mediaType - The type of media being saved (e.g., "image", "video", "audio", etc.).
     * @param metadata - Additional metadata associated with the media (uploaderId, privacy, and uploadTimestamp are required).
     * @returns A Promise resolving to the ID of the inserted media document.
     */
    async saveMedia(mediaBuffer, mediaType, metadata) {
        var _a;
        try {
            // Ensure that uploaderId, privacy, and uploadTimestamp are provided in the metadata
            const { uploaderId, privacy, uploadTimestamp } = metadata, additionalMetadata = __rest(metadata, ["uploaderId", "privacy", "uploadTimestamp"]);
            if (!uploaderId || !privacy || !uploadTimestamp) {
                throw new Error("uploaderId, privacy, and uploadTimestamp are required in metadata.");
            }
            // Create the document to be inserted into the collection
            const mediaDocument = {
                media: mediaBuffer,
                mediaType,
                metadata: Object.assign({ uploaderId,
                    privacy,
                    uploadTimestamp }, additionalMetadata),
            };
            // Insert the document into the collection and retrieve the inserted ID
            const result = await ((_a = this._collection) === null || _a === void 0 ? void 0 : _a.insertOne(mediaDocument));
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
 *          Returns undefined if the media with the provided ID is not found or access is denied.
 */
    async getMediaById(mediaId, whoAsked) {
        var _a, _b;
        if (!mongodb_1.ObjectId.isValid(mediaId)) {
            throw new Error("Invalid media id");
        }
        if (!whoAsked) {
            //If whoAsked is not provided, only return the public media document
            return (_a = this._collection) === null || _a === void 0 ? void 0 : _a.findOne({
                _id: new mongodb_1.ObjectId(mediaId),
                metadata: { privacy: 'public' }
            });
        }
        if (!mongodb_1.ObjectId.isValid(whoAsked)) {
            throw new Error("Invalid user id");
        }
        return (_b = this._collection) === null || _b === void 0 ? void 0 : _b.findOne({
            _id: new mongodb_1.ObjectId(mediaId),
            metadata: { uploaderId: new mongodb_1.ObjectId(whoAsked) }
        });
    }
}
exports.default = MediaController;
