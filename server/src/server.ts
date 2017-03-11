import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import { SourceRouter } from './routes/SourceRouter';
import { Database } from './database';
import * as Debug from 'debug';


const debug = Debug('pwa-messenger:server');

/**
 * The server. 
 * Creates and configures an ExpressJS web server.
 */
export class Server {

    public express: express.Application;

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
    public static bootstrap(): express.Application {
        return new Server().express;
    }

    /**
     * Configure application.
     */
    private configure(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));

        //catch 404 and forward to error handler
        this.express.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        if (process.env.NODE_ENV === 'development') {
            // only use in development
            this.express.use(errorHandler());
        }

        Database.init();
    }

    /**
     * Configuring the routes.
     */
    private routes(): void {
        let router = express.Router();

        SourceRouter.create(router);

        this.express.use('/', router);

    }

}