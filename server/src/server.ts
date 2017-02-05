import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';

/**
 * The server. Creates and configures an ExpressJS web server.
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @return {express.Application} Returns the newly created express application.
     */
    public static bootstrap(): express.Application {
        return new Server().app;
    }

    /**
     * Constructor.
     * Runs configuration method on the express instance.
     */
    constructor() {
        // creating expressjs server/application
        this.app = express();

        // 
        this.middleware();
        this.routes();
    }

    /**
     * Configure application.
     */
    private middleware(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        if (process.env.NODE_ENV === 'development') {
            // only use in development
            this.app.use(errorHandler());
        }
    }

    /**
     * Configuring the routes.
     */
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello PWA user!'
            });
        });
        this.app.use('/', router);
    }

}