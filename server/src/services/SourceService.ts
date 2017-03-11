import * as mongoose from 'mongoose';
import { ISourceDocument } from "../interfaces/ISourceDocument";
import { ISource } from "../shared/ISource";
import * as Debug from 'debug';
import { SourceModel } from "../models/SourceModel";
const DUMMY_DATA = require('../data.json');
const debug = Debug('pwa-messenger:SourceService');

/**
 * Service for handling message sources.
 */
export class SourceService {

    /**
     * The basic constructor. Does nothing so far.
     * @constructor
     */
    constructor() {
    }

    /**
     * Returns all available sources from the database.
     * @returns {Promise<ISourceDocument[]} promise resolving with the data
     */
    public findAll(): Promise<ISourceDocument[]> {
        return SourceModel.find().exec();
    }

    /**
     * Creates some test-data if there is no data at the database.
     * @returns
     */
    public createTestdata(): Promise<ISourceDocument[]> {
        return new Promise((resolve, reject) => {
            SourceModel.count({}, (err, count) => {
                if (count > 0) {
                    debug('There exist already ' + count + ' source(s). No test data will be created!');
                    reject(new Error('There exists already some data at the database.'));
                } else {
                    debug('No data found. Create some test data.');
                    SourceModel.create(DUMMY_DATA.sourceTestdata)
                        .then((data) => resolve(data))
                        .catch((err) => reject(err));
                }
            });
        });

    }
} 