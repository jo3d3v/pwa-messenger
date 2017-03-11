import mongoose = require('mongoose');
import * as Debug from 'debug';

const MONGODB_CONNECTION: string = "mongodb://192.168.99.100:28001/pwa";

/**
 * This class handles the connection to the mongo database. 
 * Its done with the use of mongoose.
 */
export class Database {

    /**
     * Connects to the mongo database with the given uri and defines some callbacks for different mongoose-events.
     * @param databaseUri the URI to the database
     * @constructor
     */
    constructor(private databaseUri: string) {
        // plugin own promise library - http://mongoosejs.com/docs/promises.html
        mongoose.Promise = global.Promise;
        
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true);
        }

        mongoose.connect(this.databaseUri);

        // define callbacks for connection events
        mongoose.connection.on('connected', this.__onConnected.bind(this));
        mongoose.connection.on('disconnected', this.__onDisconnected.bind(this));
        mongoose.connection.on('error', this.__onError.bind(this));
        mongoose.connection.on('SIGINT', this.__onShutdown.bind(this));
    }

    /**
     * Callback method for a successful connection to the mongo database.
     * @private
     */
    private __onConnected(): void {
        console.log('Mongoose default connection open to ' + this.databaseUri);
    }

    /**
     * Callback method for a disconnection from the mongo database. 
     * @private
     */
    private __onDisconnected(): void {
        console.log('Mongoose default connection disconnected');
    }

    /**
     * Callback method if the mongo database connection throws an error.
     * @param error the mongo error
     * @private
     */
    private __onError(error: mongoose.Error) {
        console.log('Mongoose default connection error: ' + error);
    }
    /**
     * Callback method to close the mongo database connection if the node process ends. 
     * @private
     */
    private __onShutdown() {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }
    /**
     * Initializes the database connection to the defined mongo-db using mongoose.
     * @returns the database object
     * @static
     */
    public static init(): Database {
        return new Database(MONGODB_CONNECTION);
    }
}