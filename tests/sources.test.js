/* eslint-disable import/no-unresolved */
require('dotenv').config();

const http = require('node:http');  // Library so i can build a server with express
const test = require('ava').default;
const got = require('got'); // Library so i can make requests
const listen = require('test-listen'); // In testing environment, build a test server to send request

const app = require('../src/index');
const {jwtSign} = require('../src/utilities/authentication/helpers');

require('dotenv').config(app.env);
//console.log(process.env);


// This runs before everything else
// t is an object from ava
test.before(async (t) => {
  t.context.server = http.createServer(app); // The virtual server created with express
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({http2: true, throwHttpErrors: false, responseType: 'json', prefixUrl: t.context.prefixUrl}); // Change the default settings
});

// This runs after testing to clean the testing server
test.after.always((t) => {
  t.context.server.close();
});

console.log(token);
const test_user = {
  "username": "usertesting",
  "id": "63c7aa08b0ae7a0550648094",
  "email": "usertesting@gmail.com"
};

// Test for post req sources/sources
test('GET /sources returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {body,statusCode} = await t.context.got(`sources/sources?token=${token}`);
  t.is(statusCode, 200);
  t.assert(body.success);
});


/*
// Test for post req sources/create-source
test('GET /create-sources returns correct response and status code', async (t) => {
  const {body,statusCode} = await t.context.got(`sources/create-source?token=${token}`);
  t.assert(body.success);
});

// Test for post req sources/change-source
test('GET /change-sources returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {body,statusCode} = await t.context.got(`sources/change-source?token=${token}`);
  console.log(body);
  t.assert(body.success);
});

// Test for post req sources/delete-source
test('GET /delete-sources returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {body,statusCode} = await t.context.got(`sources/delete-source?token=${token}`);
  t.assert(body.success);
});

// Test for post req sources/check-sources
test('GET /check-sources returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {body,statusCode} = await t.context.got(`sources/check-sources?token=${token}`);
  t.assert(body.success);
});
*/