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
// this an object from ava
test.before(async (t) => {
  t.context.server = http.createServer(app); // The virtual server created with express
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({http2: true, throwHttpErrors: false, responseType: 'json', prefixUrl: t.context.prefixUrl}); // Change the default settings
});

// This runs after testing to clean the testing server
test.after.always((t) => {
  t.context.server.close();
});

// Test for post req users/create
test('POST /create returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {statusCode} = await t.context.post(`users/create?token=${token}`);
  t.assert(body.success); // t.is checks if body.success == true
});


// Test for post req users/authenticate
test('POST /create returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {statusCode} = await t.context.post(`users/authenticate?token=${token}`);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req users/resetpassword
test('POST /create returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {statusCode} = await t.context.post(`users/resetpassoword?token=${token}`);
  t.assert(body.success); // t.is checks if body.success == true
});


// Test for post req users/changepassword
test('POST /create returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {statusCode} = await t.context.post(`users/changepassoword?token=${token}`);
  t.assert(body.ok); // t.is checks if body.success == true
});
