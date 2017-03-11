import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';
import * as Debug from 'debug';
import { SourceService } from "../services/SourceService";
import { SourceModel } from "../models/SourceModel";
import { ISourceDocument } from "../interfaces/ISourceDocument";

const Sources = require('../data.json');
const debug = Debug('pwa-messenger:SourceRouter');

/**
 * Router for the message sources.
 */
export class SourceRouter {

    /**
     * Initialize the SourceRouter
     */
    constructor() { }

    /**
     * Create the routes.
     */
    public static create(router: Router) {
        // log
        console.log('[SourceRouter::create] Creating index route.');

        // add route to get an overview of all sources and their last message
        router.get('/source', (req: Request, res: Response, next: NextFunction) => {
            new SourceRouter().getAll(res);
        });

        // add route to put in some test data
        router.put('/source/testdata', (req: Request, res: Response, next: NextFunction) => {
            new SourceRouter().putTestdata(res);
        });

        // add route to get source by id
        router.get('/source/:id', (req: Request, res: Response, next: NextFunction) => {
            new SourceRouter().getById(req, res, next);
        });
    }

    /**
     * GET all sources.
     * @param response the response to write to
     */
    public getAll(response: Response) {
        let service: SourceService = new SourceService();

        service.findAll().then((data) => {
            response.status(200).send(data);
        });
    }

    /**
     * PUT in some test-data for sources.
     * @param response the response
     */
    public putTestdata(response: Response) {
        let service: SourceService = new SourceService();

        service.createTestdata()
            .then(() => {
                response.sendStatus(200);
            })
            .catch(() => {
                response.sendStatus(409);
            });
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

