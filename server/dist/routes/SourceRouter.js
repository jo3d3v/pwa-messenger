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
const mongoose = require("mongoose");
const Sources = require('../data.json');
const debug = Debug('pwa-messenger:SourceRouter');
const DUMMY_DATA = require('../data.json');
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
            .get('/source', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let sources = yield SourceModel_1.Source.list();
            response.status(200).send(sources);
        }))
            .get('/source/:id/message', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = yield MessageModel_1.Message.find({ 'source': mongoose.Types.ObjectId(request.params.id) }).sort('-created');
                response.status(200).send(messages);
            }
            catch (error) {
                response.status(500).send(error);
            }
        }))
            .put('/source/testdata', (request, response) => __awaiter(this, void 0, void 0, function* () {
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
            .put('/source/message/testdata', (request, response) => __awaiter(this, void 0, void 0, function* () {
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
}
exports.SourceRouter = SourceRouter;
//# sourceMappingURL=SourceRouter.js.map