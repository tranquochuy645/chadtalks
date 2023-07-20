import { ObjectId } from "mongodb";
import { CollectionReference } from "./generic";

/**
 * RoomsController class for handling room-related operations.
 */
export default class RoomsController extends CollectionReference {
  /**
   * Create a new room.
   * @param newRoom - The room object to be created.
   * @returns A Promise resolving to the result of the insertion operation.
   */
  public createRoom(newRoom: any): Promise<any> {
    return this._collection?.insertOne(newRoom);
  }

  /**
   * Retrieve the participant lists for rooms matching the filter.
   * @param filter - The filter criteria to find rooms.
   * @returns A Promise resolving to an array of room objects.
   * @throws Error if the room is not found or the user is not a member of the room.
   */
  public async getParticipantLists(filter: any): Promise<any> {
    try {
      const result = await this._collection?.find(filter, {
        projection: {
          _id: 1,
          participants: 1
        }
      }).toArray();

      if (!result) {
        throw new Error("Room not found || Not a member of the room");
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieve the room details for the given room ID and user.
   * @param whoSearch - The user searching for the room.
   * @param roomId - The ID of the room to retrieve.
   * @param messagesLimit - The limit of messages to retrieve.
   * @returns A Promise resolving to the room details object.
   * @throws Error if the room is not found or the user is not a member of the room.
   */
  public async getRoom(whoSearch: string, roomId: string, messagesLimit: number): Promise<any> {
    try {
      let room = await this._collection?.findOne(
        {
          _id: new ObjectId(roomId),
          participants: { $in: [new ObjectId(whoSearch)] }
        },
        {
          projection: {
            _id: 0,
            participants: 1,
            messages: 1
          }
        }
      );

      if (!room) {
        throw new Error("Room not found || Not a member of the room");
      }

      room.messages = room.messages.slice(-messagesLimit);
      return room;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Add a user to the invited list of a room.
   * @param userId - The ID of the user to add to the invited list.
   * @param roomId - The ID of the room.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async pushToInvitedList(userId: string, roomId: string): Promise<number | undefined> {
    try {
      const result = await this._collection?.updateOne(
        {
          _id: new ObjectId(roomId)
        },
        {
          $push: {
            invited: new ObjectId(userId)
          }
        }
      );

      return result?.modifiedCount;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Remove a user from the invited list of a room.
   * @param whoAsked - The ID of the user requesting the removal.
   * @param roomId - The ID of the room.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async pullFromInvitedList(whoAsked: string, roomId: string): Promise<number | undefined> {
    try {
      const result = await this._collection?.updateOne(
        {
          _id: new ObjectId(roomId)
        },
        {
          $pull: {
            invited: new ObjectId(whoAsked)
          }
        }
      );

      return result?.modifiedCount;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Add a participant to a room and remove them from the invited list.
   * @param whoAsked - The ID of the user requesting the addition.
   * @param roomId - The ID of the room.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async addParticipant(whoAsked: string, roomId: string): Promise<number | undefined> {
    try {
      const result = await this._collection?.updateOne(
        {
          _id: new ObjectId(roomId)
        },
        {
          $push: { participants: new ObjectId(whoAsked) },
          $pull: { invited: new ObjectId(whoAsked) }
        }
      );

      return result?.modifiedCount;
    } catch (err) {
      throw err;
    }
  }
  /**
   * Remove a user from all rooms where they are present as a participant or invited.
   * @param userId - The ID of the user to be removed from rooms.
   * @returns A Promise resolving to the count of modified documents.
   */
  public async removeUserFromAllRooms(userId: string): Promise<number | undefined> {
    try {
      // Filter to find rooms where the user is a participant or invited
      const filter = {
        $or: [
          { participants: new ObjectId(userId) },
          { invited: new ObjectId(userId) }
        ]
      };

      // Update operation to remove the user from participants and invited arrays
      const update = {
        $pull: {
          participants: new ObjectId(userId),
          invited: new ObjectId(userId),
        },
      };

      // Use find to get all matching rooms
      const rooms = await this._collection?.find(filter, { projection: { _id: 1 } }).toArray();
      let modifiedCount = 0;

      // Use a for...of loop to ensure each update operation is executed sequentially
      for (const room of rooms) {
        const result = await this._collection?.updateOne({ _id: new ObjectId(room._id) }, update);
        if (result?.modifiedCount) {
          modifiedCount += result.modifiedCount;
        }
      }

      return modifiedCount;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Save a message in a room.
   * @param sender - The ID of the message sender.
   * @param roomId - The ID of the room.
   * @param content - The content of the message.
   * @param timestamp - The timestamp of the message.
   */
  public async saveMessage(sender: string, roomId: string, content: string, timestamp: string): Promise<void> {
    try {
      const data = {
        sender: new ObjectId(sender),
        content,
        timestamp
      };

      const result = await this._collection?.updateOne(
        { _id: new ObjectId(roomId) },
        { $push: { messages: data } }
      );

      console.log("Saved message: " + result?.modifiedCount);
    } catch (e) {
      console.error("Error saving message: " + e);
    }
  }
}