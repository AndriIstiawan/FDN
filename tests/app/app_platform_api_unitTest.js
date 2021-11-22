const request = require('supertest');
const app = require('../../app');

describe("GET /", function () {
    it('respond with main root info', function (done) {
        // navigate to root and check if output is 'This is the website's main route'
        request(app).get("/").expect({ "message": "This is the api server main route", "status": "OK" }, done);
    });

    it('respond with main root info', function (done) {
        // navigate to root and check if output is 'This is the website's main route'
        request(app).get("/esp").expect({ "message": "Not Found" }, done);
    });
});