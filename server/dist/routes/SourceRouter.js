"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express_1 = require("express");
const Debug = require("debug");
const SourceModel_1 = require("../models/SourceModel");
const MessageModel_1 = require("../models/MessageModel");
const SerializedPushSupscriptionModel_1 = require("../models/SerializedPushSupscriptionModel");
const mongoose = require("mongoose");
const webpush = require("web-push");
const Sources = require('../data.json');
const debug = Debug('pwa-messenger:SourceRouter');
const DUMMY_DATA = require('../data.json');
const API_PREFIX = '/api';
const MAX_PUSH_SUBSCRIPTION_COUNT = 100;
/**
 * Router for the message sources.
 */
class SourceRouter {
    /**
     * Create the routes.
     */
    static routes() {
        debug('Creating source routes.');
        return express_1.Router()
            .get(API_PREFIX + '/source', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let sources = yield SourceModel_1.Source.list();
            response.status(200).send(sources);
        }))
            .get(API_PREFIX + '/source/:id/message', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = yield MessageModel_1.Message.find({ 'source': mongoose.Types.ObjectId(request.params.id) }).sort('-created');
                response.status(200).send(messages);
            }
            catch (error) {
                response.status(500).send(error);
            }
        }))
            .put(API_PREFIX + '/source/:id/message', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                let message = yield SourceRouter.createRandomMessage(request.params.id);
                yield SourceRouter.pushMessage(message);
                response.sendStatus(200);
            }
            catch (error) {
                response.status(500).send(error);
            }
        }))
            .post(API_PREFIX + '/push', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                let count = yield SerializedPushSupscriptionModel_1.SerializedPushSubscription.count({});
                if (count < MAX_PUSH_SUBSCRIPTION_COUNT) {
                    let subscriptions = yield SerializedPushSupscriptionModel_1.SerializedPushSubscription.find(request.body);
                    if (subscriptions.length === 0) {
                        SerializedPushSupscriptionModel_1.SerializedPushSubscription.create(request.body);
                    }
                }
                // TODO handle max count
                response.sendStatus(200);
            }
            catch (error) {
                response.status(500).send(error);
            }
        }))
            .put(API_PREFIX + '/source/testdata', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let count = yield SourceModel_1.Source.count({});
            if (count > 0) {
                debug('There exist already ' + count + ' source(s). No test data will be created!');
                response.status(409).send('There exists already some data at the database.');
            }
            else {
                debug('No data found. Create some test data.');
                SourceModel_1.Source.create(DUMMY_DATA.sources)
                    .then(() => response.sendStatus(200))
                    .catch((err) => response.status(500).send(err));
            }
        }))
            .put(API_PREFIX + '/source/message/testdata', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let sources = yield SourceModel_1.Source.list();
            if (sources.length == 0) {
                response.status(400).send('Create some sources first!');
                return;
            }
            let count = yield MessageModel_1.Message.count({});
            if (count > 0) {
                debug('There exist already ' + count + ' message(s). No test data will be created!');
                response.status(409).send('There exists already some data at the database.');
            }
            else {
                debug('Found ' + sources.length + ' source(s) for test-data-generation.');
                // add a random message to a random source
                let messages = DUMMY_DATA.messages;
                let message;
                let source;
                for (let i = 0; i < 20; i++) {
                    source = sources[Math.floor(Math.random() * sources.length)];
                    message = new MessageModel_1.Message(messages[Math.floor(Math.random() * messages.length)]);
                    message.source = source;
                    source.lastMessage = message._id;
                    yield message.save();
                    yield source.save();
                }
                response.sendStatus(200);
            }
        }));
    }
    /**
     * Creates randomly messages for given source.
     */
    static createRandomMessage(sourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            let source = yield SourceModel_1.Source.findById(mongoose.Types.ObjectId(sourceId));
            if (source) {
                let messages = DUMMY_DATA.messages;
                let message;
                message = new MessageModel_1.Message(messages[Math.floor(Math.random() * messages.length)]);
                message.source = source;
                source.lastMessage = message._id;
                yield message.save();
                yield source.save();
                return message;
            }
        });
    }
    /**
     * Pushes a message over the pushing channel.
     */
    static pushMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let source = message.source.name;
            let address = message.address;
            let content = message.content;
            let subscriptions = yield SerializedPushSupscriptionModel_1.SerializedPushSubscription.list();
            subscriptions.forEach(subscription => webpush.sendNotification({
                endpoint: subscription.endpoint,
                keys: {
                    auth: subscription.auth,
                    p256dh: subscription.p256dh
                }
            }, `${source}: ${content} (${address})`));
        });
    }
}
exports.SourceRouter = SourceRouter;
//# sourceMappingURL=SourceRouter.js.map