import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import * as server from '../src/server';
const app = server.Server.bootstrap();

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {

    it('response should be json', () => {
        return chai.request(app).get('/').then(response => {
            expect(response.type).to.eql('application/json');
        });
    });

    it('response should have a message property', () => {
        return chai.request(app).get('/').then(response => {
            expect(response.body.message).eql('Hello PWA!');
        });
    });
});