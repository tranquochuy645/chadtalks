import DatabaseSetup from './Setup';
import DBConnection from './Connection';
import { DbOptions, Db } from 'mongodb';
import UsersController from './CRUD/CollectionOriented/users';
import RoomsController from './CRUD/CollectionOriented/rooms';
import MeetingsController from './CRUD/CollectionOriented/meetings';
import RoomsExtractor from './CRUD/Combined/roomsExtractor';
import Watcher from './Watcher';

/**
 * DatabaseController class for managing database setup and providing access to collections.
 */
class DatabaseController extends DatabaseSetup {
  public static readonly _collectionNames = ["users", "rooms", "meetings"];
  private static instance: DatabaseController;
  private connection: DBConnection | undefined;
  private db: Db | undefined;
  private _users: UsersController | undefined;
  private _rooms: RoomsController | undefined;
  private _meetings: MeetingsController | undefined;
  private _roomsExtractor: RoomsExtractor | undefined;
  private _watcher: Watcher | undefined

  private constructor() {
    super();
  }

  /**
   * Get the singleton instance of DatabaseController.
   * @returns The singleton instance of DatabaseController.
   */
  public static getInstance(): DatabaseController {
    if (!DatabaseController.instance) {
      DatabaseController.instance = new DatabaseController();
    }
    return DatabaseController.instance;
  }

  /**
   * Initialize the database connection and setup collections.
   * @param mongo_uri - The MongoDB connection URI.
   * @param db_name - The name of the database.
   * @param opts - Options for the MongoDB connection.
   */
  public async init(mongo_uri: string, db_name: string, opts: DbOptions) {
    this.connection = new DBConnection(mongo_uri, db_name, opts);
    this.db = await this.connection.getDb();
    await this.setup(this.db);
    this._watcher = new Watcher(this.db, DatabaseController._collectionNames);
    this._users = new UsersController(this.db.collection("users"));
    this._rooms = new RoomsController(this.db.collection("rooms"));
    this._meetings = new MeetingsController(this.db.collection("meetings"));
    this._roomsExtractor = new RoomsExtractor(this._users, this._rooms);
  }

  /**
   * Create a change watcher for a MongoDB collection.
   * @param collectionName - The name of the collection to watch.
   * @param pipeline - The aggregation pipeline for filtering changes (optional).
   * @param callback - The callback function to handle changes.
   */
  public watch(
    collectionName: string,
    pipeline: Array<any> = [],
    callback: (change: any) => void
  ) {
    this._watcher?.watch(collectionName, pipeline, callback);
  }

  /**
   * Get the UsersController instance for accessing the 'users' collection.
   * @throws Error if the UsersController instance is not initialized.
   * @returns The UsersController instance.
   */
  public get users() {
    if (!this._users) throw new Error("USERS NOT INITIALIZED");
    return this._users;
  }

  /**
   * Get the RoomsController instance for accessing the 'rooms' collection.
   * @throws Error if the RoomsController instance is not initialized.
   * @returns The RoomsController instance.
   */
  public get rooms() {
    if (!this._rooms) throw new Error("ROOMS NOT INITIALIZED");
    return this._rooms;
  }

  /**
   * Get the MeetingsController instance for accessing the 'meetings' collection.
   * @throws Error if the MeetingsController instance is not initialized.
   * @returns The MeetingsController instance.
   */
  public get meetings() {
    if (!this._meetings) throw new Error("MEETINGS NOT INITIALIZED");
    return this._meetings;
  }

  /**
   * Get the RoomsExtractor instance for extracting rooms data based on user ID.
   * @throws Error if the RoomsExtractor instance is not initialized.
   * @returns The RoomsExtractor instance.
   */
  public get roomsExtractor() {
    if (!this._roomsExtractor) throw new Error("RoomsExtractor NOT INITIALIZED");
    return this._roomsExtractor;
  }
}

const chatAppDbController = DatabaseController.getInstance();
export default DatabaseController;
export { chatAppDbController };