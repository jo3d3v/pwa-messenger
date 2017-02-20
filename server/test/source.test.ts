import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import * as server from '../src/server';
const app = server.Server.bootstrap();

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /source', () => {

    it('responds with JSON containing result-array and totalsize', () => {
        return chai.request(app).get('/source')
            .then(res => {
                let messageCount = 3;
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.results).to.be.an('array');
                expect(res.body.results).to.have.length(messageCount);
                expect(res.body.totalSize).to.eql(messageCount);
            });
    });

    it('response should contain Chuck Norris', () => {
        return chai.request(app).get('/source')
            .then(response => {
                let chuck = response.body.results.find(source => source.name === 'Chuck Norris');
                expect(chuck).to.exist;
                expect(chuck).to.have.all.keys([
                    'sourceId',
                    'name',
                    'lastMessage',
                    'lastMessageTimestamp',
                    'type'
                ]);
            });
    });
});

describe('GET /source/:sourceId/message', () => {

    xit('respond should contain a list with on', () => {
        return chai.request(app).get('/source/1/message')
            .then(response => {

            });
    });
});