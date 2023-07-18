// import { Db, ObjectId } from 'mongodb';
// import roomSchema from '../Schema/room.json';
// import userSchema from '../Schema/user.json';
// import mediaSchema from '../Schema/media.json';
// declare global {
//   var globalChatId: ObjectId;
// }
// // Define the global chat room object
// const globalChat = {
//   type: "global",
//   participants: [],
//   messages: []
// };

// // Define the collection names and validators
// const collectionNames = ['users', 'rooms', 'media'];
// const validators = [userSchema, roomSchema, mediaSchema];

// // Function to create a collection with a validator
// const createCollection = async (db: Db, collectionName: string, validator: object) => {
//   try {
//     const collection = await db.createCollection(collectionName, { validator });
//     console.log('Collection created successfully:', collection.collectionName);

//     if (collectionName === 'rooms') {
//       const insertedData = await collection.insertOne(globalChat);
//       globalThis.globalChatId = insertedData.insertedId;
//       console.log('Created global chat room successfully');
//     }
//   } catch (err) {
//     console.error('Failed to create collection:', collectionName, err);
//   }
// };

// // Function to find or create the global chat room
// const findOrCreateGlobalChatRoom = async (db: Db, collectionName: string) => {
//   try {
//     const data = await db.collection(collectionName).find({ type: 'global' }).toArray();

//     if (data.length > 0) {
//       globalThis.globalChatId = data[0]._id;
//     } else {
//       const insertedData = await db.collection(collectionName).insertOne(globalChat);
//       globalThis.globalChatId = insertedData.insertedId;
//       console.log('Created global chat room successfully');
//     }
//   } catch (err) {
//     console.error('Failed to fetch data from collection:', collectionName, err);
//   }
// };

// // Function to set isOnline to false for all users
// const resetOnlineState = (db: Db) => {
//   db.collection("users").updateMany({}, { $set: { isOnline: false } })
//     .then(result => {
//       console.log("Reset online state: ", result.modifiedCount);
//     })
//     .catch(err => {
//       console.error('Failed to reset online state:', err);
//     });
// };

// // Main setup function
// const setup = async (db: Db) => {
//   try {
//     for (const [index, collectionName] of collectionNames.entries()) {
//       const collectionInfo = await db.listCollections({ name: collectionName }).next();

//       if (!collectionInfo) {
//         await createCollection(db, collectionName, validators[index]);
//       } else if (collectionName === 'rooms') {
//         await findOrCreateGlobalChatRoom(db, collectionName);
//       }
//     }
//     await resetOnlineState(db);
//   } catch (err) {
//     console.error('Failed to check collection:', err);
//   }
// };

// export { setup };
import { Db, ObjectId } from 'mongodb';
import roomSchema from '../Schema/room.json';
import userSchema from '../Schema/user.json';
import mediaSchema from '../Schema/media.json';

declare global {
  var globalChatId: ObjectId;
}

class DatabaseSetup {
  // Define the global chat room object
  private globalChat = {
    type: "global",
    participants: [],
    messages: []
  };

  // Define the collection names and validators
  private collectionNames = ['users', 'rooms', 'media'];
  private validators = [userSchema, roomSchema, mediaSchema];

  // Function to create a collection with a validator
  private async createCollection(db: Db, collectionName: string, validator: object) {
    try {
      const collection = await db.createCollection(collectionName, { validator });
      console.log('Collection created successfully:', collection.collectionName);

      if (collectionName === 'rooms') {
        const insertedData = await collection.insertOne(this.globalChat);
        globalThis.globalChatId = insertedData.insertedId;
        console.log('Created global chat room successfully');
      }
    } catch (err) {
      console.error('Failed to create collection:', collectionName, err);
    }
  }

  // Function to find or create the global chat room
  private async findOrCreateGlobalChatRoom(db: Db, collectionName: string) {
    try {
      const data = await db.collection(collectionName).find({ type: 'global' }).toArray();

      if (data.length > 0) {
        globalThis.globalChatId = data[0]._id;
      } else {
        const insertedData = await db.collection(collectionName).insertOne(this.globalChat);
        globalThis.globalChatId = insertedData.insertedId;
        console.log('Created global chat room successfully');
      }
    } catch (err) {
      console.error('Failed to fetch data from collection:', collectionName, err);
    }
  }

  // Function to set isOnline to false for all users
  private resetOnlineState(db: Db) {
    db.collection("users").updateMany({}, { $set: { isOnline: false } })
      .then(result => {
        console.log("Reset online state: ", result.modifiedCount);
      })
      .catch(err => {
        console.error('Failed to reset online state:', err);
      });
  }

  // Main setup function
  public async setup(db: Db) {
    try {
      for (const [index, collectionName] of this.collectionNames.entries()) {
        const collectionInfo = await db.listCollections({ name: collectionName }).next();

        if (!collectionInfo) {
          await this.createCollection(db, collectionName, this.validators[index]);
        } else if (collectionName === 'rooms') {
          await this.findOrCreateGlobalChatRoom(db, collectionName);
        }
      }
      await this.resetOnlineState(db);
    } catch (err) {
      console.error('Failed to check collection:', err);
    }
  }
}

export default DatabaseSetup;

