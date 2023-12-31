import { ObjectId } from "mongodb";
import { CollectionReference } from "./generic";

import { RoomList } from "../interfaces";

class User {
  username: string;
  password: string;
  fullname: string;
  avatar: string;
  isOnline: boolean;
  invitations: ObjectId[];
  rooms: ObjectId[];
  createdAt: Date;

  constructor(
    username: string,
    password: string,
  ) {
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
/**
 * UsersController class for handling user-related operations.
 */
export default class UsersController extends CollectionReference {
  /**
   * Check if a username is available.
   * @param username - The username to check availability.
   * @returns A Promise resolving to a boolean indicating if the username is available.
   */
  public async checkAvailableUserName(username: string): Promise<boolean> {
    const result = await this._collection.findOne({ username });
    return !result;
  }

  /**
   * Create a new user.
   * @param newUser - The user object to be created.
   * @returns A Promise resolving to the created user objectId
   */
  public async createUser(username: string, password: string): Promise<ObjectId> {
    try {
      const result = await this._collection.insertOne(new User(username, password));
      // Return the inserted ID
      if (result && result.insertedId) {
        return result.insertedId;
      }
      throw new Error("User insertion failed.");
    } catch (err) {
      throw err;
    }
  }

  /**
   * Read the full profile of a user.
   * @param id - The ID of the user.
   * @returns A Promise resolving to the user's profile object.
   */
  public readProfile(id: string): Promise<any> {
    return this._collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0, invitations: 0 } }
    );
  }

  /**
   * Read the short profile of a user.
   * @param id - The ID of the user.
   * @returns A Promise resolving to the user's short profile object.
   */
  public readShortProfile(id: string): Promise<any> {
    return this._collection.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          fullname: 1,
          avatar: 1,
          isOnline: 1,
        }
      }
    );
  }


  /**
   * Read the short profiles of multiple users matching the filter.
   * @param filter - The filter criteria to find users.
   * @returns A Promise resolving to an array of user short profile objects.
   */
  public readManyShortProfiles(filter: any): Promise<any[]> {
    return this._collection.find(
      filter,
      {
        projection: {
          fullname: 1,
          avatar: 1,
          bio: 1,
          isOnline: 1,
        }
      }
    ).toArray();
  }

  /**
   * Update a user's information.
   * This method accepts dynamic update by $set operator, so use it carefully.
   * @param id - The ID of the user.
   * @param data - The updated data for the user.
   * @returns A Promise resolving to the result of the update operation.
   */
  public async updateUser(id: string, data: any): Promise<any> {
    try {
      const result = await this._collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
      return result.modifiedCount
    } catch (err) {
      throw err
    }
  }

  /**
 * Delete a user.
 * @param id - The ID of the user to be deleted.
 * @returns A Promise resolving to the result of the deletion operation.
 */
  public async deleteUser(id: string): Promise<any> {
    try {
      const result = await this._collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount;
    } catch (err) {
      throw err;
    }
  }

  /**
 * Get the password of a user.
 * @param username - The username of the user (optional).
 * @param userId - The ID of the user (optional).
 * @returns A Promise resolving to the user's _id and password.
 *  Will reject if both the username and userId are missing
 * 
 */
  public getPassword(username?: string, userId?: string): Promise<any> {
    if (userId) {
      return this._collection.findOne(
        { _id: new ObjectId(userId) },
        { projection: { password: 1 } }
      );
    }
    if (username) {
      return this._collection.findOne(
        { username: username },
        { projection: { password: 1 } }
      );
    }
    // Handle the case where both username and userId are undefined
    return Promise.reject("Require at least one username or userId");

  }


  /**
   * Set the online status of a user.
   * @param id - The ID of the user.
   * @param isOnline - The online status to set.
   * @returns A Promise resolving to the result of the update operation.
   */
  public setStatus(id: string, isOnline: boolean): Promise<any> {
    return this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isOnline: isOnline, lastUpdate: new Date() } }
    );
  }

  /**
   * Get the rooms of a user.
   * @param id - The ID of the user.
   * @returns A Promise resolving to the user's rooms oid array: ObjecId[] 
   */
  public async getRoomsList(id: string): Promise<ObjectId[]> {
    try {
      const result = await this._collection.findOne(
        { _id: new ObjectId(id) },
        { projection: { _id: 0, rooms: 1 } }
      );
      if (!result) {
        return []
      }
      return result.rooms
    } catch (err) {
      throw err
    }
  }

  /**
  * Remove room IDs from the rooms list of multiple users.
  * @param userIds - An array of user IDs.
  * @param roomId - The ID of the room to remove from the rooms lists.
  * @returns A Promise resolving to the count of modified documents.
  */
  public async pullFromRoomsLists(userIds: string[], roomId: string): Promise<number | undefined> {
    try {
      const userIdObjects = userIds.map(id => new ObjectId(id));
      let modifiedCount = 0;

      // Use Promise.all to await all updateOne calls concurrently
      const updatePromises = userIdObjects.map(async oid => {
        const result = await this._collection.updateOne(
          { _id: oid },
          {
            $pull: { rooms: new ObjectId(roomId) }
          }
        );
        modifiedCount += result?.modifiedCount || 0;
      });

      // Wait for all updateOne calls to complete
      await Promise.all(updatePromises);

      return modifiedCount;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Remove room IDs from the invitation list of multiple users.
   * @param userIds - An array of user IDs.
   * @param roomId - The ID of the room to remove from the invitations lists.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async pullFromInvitationsLists(userIds: string[], roomId: string): Promise<number | undefined> {
    try {
      const userIdObjects = userIds.map(id => new ObjectId(id));
      let modifiedCount = 0;

      // Use Promise.all to await all updateOne calls concurrently
      const updatePromises = userIdObjects.map(async oid => {
        const result = await this._collection.updateOne(
          { _id: oid },
          {
            $pull: { invitations: new ObjectId(roomId) }
          }
        );
        modifiedCount += result?.modifiedCount || 0;
      });

      // Wait for all updateOne calls to complete
      await Promise.all(updatePromises);

      return modifiedCount;
    } catch (e) {
      throw e;
    }
  }


  /**
   * Invite a user to a room.
   * @param userId - The ID of the user to invite.
   * @param roomId - The ID of the room to invite the user to.
   * @returns A Promise resolving to the count of modified documents (1 if the invitation was successful, 0 otherwise).
   * @throws If any error occurs during the database query or data processing.
   */
  public async inviteToRoom(userId: string, roomId: string): Promise<number | undefined> {
    try {
      const result = await this._collection.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { invitations: new ObjectId(roomId) } }
      );
      return result?.modifiedCount;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Add a room ID to the rooms list of a user and remove it from the invitation list.
   * @param userId - The ID of the user.
   * @param roomId - The ID of the room to join.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async joinRoom(userId: string, roomId: string): Promise<number | undefined> {
    try {
      const result = await this._collection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $addToSet: { rooms: new ObjectId(roomId) },
          $pull: { invitations: new ObjectId(roomId) }
        }
      );

      return result?.modifiedCount;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Remove a room ID from the rooms list of a user.
   * @param userId - The ID of the user.
   * @param roomId - The ID of the room to leave.
   * @returns A Promise resolving to the result of the update operation.
   */
  public leaveRoom(userId: string, roomId: string): Promise<any> {
    return this._collection.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { rooms: new ObjectId(roomId) } }
    );
  }

  /**
   * Search for users matching a query.
   * @param whoSearch - The ID of the user performing the search.
   * @param query - The search query.
   * @param limit - The maximum number of results to return.
   * @returns A Promise resolving to an array of matching user objects.
   */
  public search(whoSearch: string, query: string, limit: number): Promise<any[]> {
    return this._collection.find(
      {
        fullname: new RegExp(query, "i"),
        _id: { $ne: new ObjectId(whoSearch) }
      },
      { projection: { _id: 1, fullname: 1, avatar: 1 } }
    ).limit(limit).toArray();
  }

  /**
   * Update multiple users matching a filter.
   * @param filter - The filter criteria to find users.
   * @param update - The update to be applied to the matching users.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async updateMany(filter: any, update: any): Promise<number | undefined> {
    try {
      const result = await this._collection.updateMany(filter, update);
      return result?.modifiedCount;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Extracts the list of rooms associated with a specific user, including information about the participants and meeting details.
   * @param userId - The ID of the user for whom to retrieve the rooms.
   * @returns A Promise resolving to an array of room objects with participant details and meeting information.
   *          An empty array if no room, or can not find the user.
   * @throws If any error occurs during the database query or data processing.
   */
  public async extractRoomsList(userId: string): Promise<RoomList> {
    try {
      const allRoomsOfUser = await this._collection.aggregate([
        // Match the user with the specified ObjectId
        {
          $match: { _id: new ObjectId(userId) }
        },
        // Limit the result to one document, as we are interested in one user's data
        {
          $limit: 1
        },
        // Project to keep only the "rooms" field from the user document
        {
          $project: {
            _id: 0,
            rooms: 1
          }
        },
        // Perform a lookup to get all userRooms based on the "rooms" array
        {
          $lookup: {
            from: "rooms",
            localField: "rooms",
            foreignField: "_id",
            as: "userRooms"
          }
        },
        // Unwind the "userRooms" array to prepare for the next stage
        {
          $unwind: "$userRooms"
        },
        // Perform another lookup to get information about participants in each room
        {
          $lookup: {
            from: "users",
            localField: "userRooms.participants",
            foreignField: "_id",
            as: "userRooms.participantsInfo"
          }
        },
        // Project to shape the "participantsInfo" field within the "rooms" array
        {
          $project: {
            "userRooms._id": 1,
            "userRooms.participantsInfo": {
              _id: 1,
              fullname: 1,
              avatar: 1,
              isOnline: 1,
              bio: 1
            },
            "userRooms.isMeeting": 1,
            "userRooms.meeting_uuid": 1,
            "userRooms.type": 1,
            "userRooms.lastReadTimeStamp": {
              $reduce: {
                input: "$userRooms.readCursors",
                initialValue: null,
                in: {
                  $cond: [
                    { $eq: ["$$this._id", new ObjectId(userId)] },
                    "$$this.lastReadTimeStamp",
                    "$$value"
                  ]
                }
              }
            },
            "userRooms.latestMessage": {
              $arrayElemAt: ["$userRooms.messages", -1] // Get the last message from the "messages" array
            }
          }
        },
        // Group the documents back to the original structure using $group
        {
          $group: {
            _id: "$_id",
            rooms: {
              $push: {
                _id: "$userRooms._id",
                participants: "$userRooms.participantsInfo",
                isMeeting: "$userRooms.isMeeting",
                meeting_uuid: "$userRooms.meeting_uuid",
                type: "$userRooms.type",
                lastReadTimeStamp: "$userRooms.lastReadTimeStamp",
                latestMessage: "$userRooms.latestMessage"
              }
            }
          }
        }
      ]).toArray();

      // Return the rooms array of the first document (user) in the result
      return allRoomsOfUser[0]?.rooms || [];
    } catch (err: any) {
      const errStacked = new Error(`Error in extractRoom: ${err.message}`);
      throw errStacked;
    }
  }

  /**
   * Extracts a list of invitations for a user from the database.
   * @param userId - The ID of the user for whom to extract invitations.
   * @returns A Promise containing a list of invitations (rooms).
   */
  public async extractInvitationsList(userId: string): Promise<RoomList> {
    try {
      // Aggregate pipeline to extract invitations for a user
      const allInvsOfUser = await this._collection.aggregate([
        // Match the user with the specified ObjectId
        {
          $match: { _id: new ObjectId(userId) }
        },
        // Limit the result to one document, as we are interested in one user's data
        {
          $limit: 1
        },
        // Project to keep only the "invitations" field from the user document
        {
          $project: {
            _id: 0,
            invitations: 1
          }
        },
        // Perform a lookup to get all userRooms based on the "invitations" array
        {
          $lookup: {
            from: "rooms",
            localField: "invitations",
            foreignField: "_id",
            as: "tmp"
          }
        },
        // Unwind the array to prepare for the next stage
        {
          $unwind: "$tmp"
        },
        // Perform another lookup to get information about admin in each room
        {
          $lookup: {
            from: "users",
            localField: "tmp.admin",
            foreignField: "_id",
            as: "tmp.adminInfo"
          }
        },
        // Project the final fields for the extracted invitations
        {
          $project: {
            "tmp._id": 1,
            "tmp.adminInfo": {
              fullname: 1,
              avatar: 1,
            },
            "tmp.type": 1,
          }
        },
        // Group the documents back to the original structure using $group
        {
          $group: {
            _id: "$_id",
            invitations: {
              $push: {
                _id: "$tmp._id",
                invitor: { $arrayElemAt: ["$tmp.adminInfo", 0] }, // Use $arrayElemAt to extract the single object from the array
                type: "$tmp.type"
              }
            }
          }
        }
      ]).toArray();

      // Return the extracted invitations, or an empty array if not found
      return allInvsOfUser[0]?.invitations || [];
    } catch (err: any) {
      // Handle and re-throw any errors that occur during the extraction
      const errStacked = new Error(`Error in extractInvitations: ${err.message}`);
      throw errStacked;
    }
  }



}

