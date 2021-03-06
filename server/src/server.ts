import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as compression from 'compression';
import * as cors from 'cors';
import * as sslRedirect from 'heroku-ssl-redirect';
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
        this.express.use(sslRedirect());
        this.express.use(cors());
        this.express.options('*', cors());
        this.express.use(compression());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
        this.express.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        // Create link to Angular build directory
        let distDir = __dirname + '/../../spa/dist/';
        this.express.use(express.static(distDir));

        // catch 404 and forward to error handler
        this.express.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // error handling
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
        this.express.use('/api', SourceRouter.routes());
        this.express.use(function (request: express.Request, response: express.Response) {
            // respond with html page
            if (request.accepts('html')) {
                response.sendfile(path.resolve(__dirname + '/../../spa/dist/index.html'));
                return;
            }

            // set status for real 404s
            response.status(404);

            // respond with json
            if (request.accepts('json')) {
                response.send({ error: 'Not found' });
                return;
            }

            // default to plain-text. send()
            response.type('txt').send('Not found');
        });
    }

}