import { Router, Request, Response } from 'express';
import * as Debug from 'debug';
import { Source, ISourceDocument } from '../models/SourceModel';
import { Message, IMessageDocument } from '../models/MessageModel';
import { SerializedPushSubscription, ISerializedPushSubscriptionDocument } from '../models/SerializedPushSupscriptionModel';
import * as mongoose from 'mongoose';
import * as webpush from 'web-push';

const Sources = require('../data.json');
const debug = Debug('pwa-messenger:SourceRouter');
const DUMMY_DATA = require('../data.json');
const API_PREFIX = '/api';
const MAX_PUSH_SUBSCRIPTION_COUNT = 100;

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
            .get(API_PREFIX + '/source', async (request: Request, response: Response) => {
                let sources: ISourceDocument[] = await Source.list();
                response.status(200).send(sources);
            })

            // add route to get source by id
            .get(API_PREFIX + '/source/:id/message', async (request: Request, response: Response) => {
                try {
                    let messages: IMessageDocument[] = await Message.find({ 'source': mongoose.Types.ObjectId(request.params.id) }).sort('-created');
                    response.status(200).send(messages);
                } catch (error) {
                    response.status(500).send(error);
                }
            })

            // add route for trigger message
            .put(API_PREFIX + '/source/:id/message', async (request: Request, response: Response) => {
                try {
                    let message: IMessageDocument = await SourceRouter.createRandomMessage(request.params.id);
                    await SourceRouter.pushMessage(message);
                    response.sendStatus(200);
                } catch (error) {
                    response.status(500).send(error);
                }
            })

            // add push subscription
            .post(API_PREFIX + '/push', async (request: Request, response: Response) => {
                try {
                    let count: number = await SerializedPushSubscription.count({});
                    if (count < MAX_PUSH_SUBSCRIPTION_COUNT) {
                        let subscriptions: ISerializedPushSubscriptionDocument[] = await SerializedPushSubscription.find(request.body);
                        if (subscriptions.length === 0) {
                            SerializedPushSubscription.create(request.body);
                        }
                    }
                    // TODO handle max count
                    response.sendStatus(200);
                } catch (error) {
                    response.status(500).send(error);
                }
            })

            // add route to put in some test data
            .put(API_PREFIX + '/source/testdata', async (request: Request, response: Response) => {
                let count: number = await Source.count({});

                if (count > 0) {
                    debug('There exist already ' + count + ' source(s). No test data will be created!');
                    response.status(409).send('There exists already some data at the database.');
                } else {
                    debug('No data found. Create some test data.');
                    Source.create(DUMMY_DATA.sources)
                        .then(() => response.sendStatus(200))
                        .catch((err) => response.status(500).send(err));
                }
            })

            .put(API_PREFIX + '/source/message/testdata', async (request: Request, response: Response) => {
                let sources: ISourceDocument[] = await Source.list();
                if (sources.length == 0) {
                    response.status(400).send('Create some sources first!');
                    return;
                }

                let count = await Message.count({});
                if (count > 0) {
                    debug('There exist already ' + count + ' message(s). No test data will be created!');
                    response.status(409).send('There exists already some data at the database.');
                } else {
                    debug('Found ' + sources.length + ' source(s) for test-data-generation.')

                    // add a random message to a random source
                    let messages = DUMMY_DATA.messages;
                    let message: IMessageDocument;
                    let source: ISourceDocument;
                    for (let i = 0; i < 20; i++) {
                        source = sources[Math.floor(Math.random() * sources.length)];
                        message = new Message(messages[Math.floor(Math.random() * messages.length)]);
                        message.source = source;
                        source.lastMessage = message._id;
                        await message.save();
                        await source.save();
                    }

                    response.sendStatus(200);
                }
            });
    }

    /**
     * Creates randomly messages for given source.
     */
    public static async createRandomMessage(sourceId: string) {
        let source: ISourceDocument = await Source.findById(mongoose.Types.ObjectId(sourceId));
        if (source) {
            let messages = DUMMY_DATA.messages;
            let message: IMessageDocument;
            message = new Message(messages[Math.floor(Math.random() * messages.length)]);
            message.source = source;
            source.lastMessage = message._id;
            await message.save();
            await source.save();

            return message;
        }
    }

    /**
     * Pushes a message over the pushing channel.
     */
    public static async pushMessage(message: IMessageDocument) {
        let source: string = message.source.name;
        let address: string = message.address;
        let content: string = message.content;
        let subscriptions: ISerializedPushSubscriptionDocument[] = await SerializedPushSubscription.list();
        subscriptions.forEach(subscription => webpush.sendNotification({
            endpoint: subscription.endpoint,
            keys: {
                auth: subscription.auth,
                p256dh: subscription.p256dh
            }
        }, `${source}: ${content} (${address})`));
    }
}

