"use strict";
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const SourceRouter_1 = require("./routes/SourceRouter");
const database_1 = require("./database");
const Debug = require("debug");
const debug = Debug('pwa-messenger:server');
/**
 * The server.
 * Creates and configures an ExpressJS web server.
 */
class Server {
    /**
     * Constructor.
     * Runs configuration method on the express instance.
     */
    constructor() {
        this.express = express();
        this.configure();
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @return {express.Application} Returns the newly created express application.
     */
    static bootstrap() {
        return new Server().express;
    }
    /**
     * Configure application.
     */
    configure() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
        // catch 404 and forward to error handler
        this.express.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        // error handling
        if (process.env.NODE_ENV === 'development') {
            // only use in development
            this.express.use(errorHandler());
        }
        database_1.Database.init();
    }
    /**
     * Configuring the routes.
     */
    routes() {
        this.express.use('/', SourceRouter_1.SourceRouter.routes());
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map