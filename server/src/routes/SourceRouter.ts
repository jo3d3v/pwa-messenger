import {
    Router,
    Request,
    Response
} from 'express';
import * as Debug from 'debug';
import { Source } from "../models/SourceModel";

const Sources = require('../data.json');
const debug = Debug('pwa-messenger:SourceRouter');
const DUMMY_DATA = require('../data.json');

/**
 * Router for the message sources.
 */
export class SourceRouter {

    /**
     * Create the routes.
     */
    public static routes(): Router {
        debug('Creating source routes.');

        return Router()

            // add route to get all sources and their last message
            .get('/source', async (reques: Request, response: Response) => {
                let sources = await Source.list();
                response.status(200).send(sources);
            })

            // add route to put in some test data
            .put('/source/testdata', async (request: Request, response: Response) => {
                let count = await Source.count({});
                if (count > 0) {
                    debug('There exist already ' + count + ' source(s). No test data will be created!');
                    response.status(409).send('There exists already some data at the database.');
                } else {
                    debug('No data found. Create some test data.');
                    Source.create(DUMMY_DATA.sourceTestdata)
                        .then(() => response.sendStatus(200))
                        .catch((err) => response.status(500).send(err));
                }
            })

            // add route to get source by id
            .get('/source/:id', (request: Request, response: Response) => {
                
            });
    }
}

