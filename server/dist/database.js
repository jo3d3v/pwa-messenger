"use strict";
const mongoose = require("mongoose");
const MONGODB_CONNECTION = process.env.MONGOLAB_URI || 'mongodb://192.168.99.100:28001/pwa';
/**
 * This class handles the connection to the mongo database.
 * It's done with the use of mongoose.
 */
class Database {
    /**
     * Connects to the mongo database with the given uri and defines some callbacks for different mongoose-events.
     * @param databaseUri the URI to the database
     * @constructor
     */
    constructor(databaseUri) {
        this.databaseUri = databaseUri;
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
    __onConnected() {
        console.log('Mongoose default connection open to ' + this.databaseUri);
    }
    /**
     * Callback method for a disconnection from the mongo database.
     * @private
     */
    __onDisconnected() {
        console.log('Mongoose default connection disconnected');
    }
    /**
     * Callback method if the mongo database connection throws an error.
     * @param error the mongo error
     * @private
     */
    __onError(error) {
        console.log('Mongoose default connection error: ' + error);
    }
    /**
     * Callback method to close the mongo database connection if the node process ends.
     * @private
     */
    __onShutdown() {
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
    static init() {
        return new Database(MONGODB_CONNECTION);
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map