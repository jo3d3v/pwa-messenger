import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';
import * as Debug from 'debug';

const Sources = require('../data.json');
const debug = Debug('pwa-messenger:SourceRouter');

export class SourceRouter {

    /**
     * Create the routes.
     */
    public static create(router: Router) {
        // log
        console.log('[SourceRouter::create] Creating index route.');

        // add route to get an overview of all sources and their last message
        router.get('/source', (req: Request, res: Response, next: NextFunction) => {
            new SourceRouter().getAll(req, res, next);
        });

        // add route to get source by id
        router.get('/source/:id', (req: Request, res: Response, next: NextFunction) => {
            new SourceRouter().getById(req, res, next);
        });
    }

    /**
     * Initialize the SourceRouter
     */
    constructor() { }

    /**
     * GET all sources.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Sources.overview);
    }

    /**
     * GET messages of one source by id
     */
    public getById(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        debug(query);
        
        let source = Sources.details2;
        if (source) {
            res.status(200).send(source);
        }
        else {
            res.status(404)
                .send({
                    message: 'No source found with the given id.',
                    status: res.status
                });
        }
    }

}

