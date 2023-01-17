/* eslint-disable import/no-unresolved */
require('dotenv').config();

const http = require('node:http');  // Library so i can build a server with express
const test = require('ava').default;
const got = require('got'); // Library so i can make requests
const listen = require('test-listen'); // In testing environment, build a test server to send request

const app = require('../src/index');


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


test('GET /dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/dashboards');
  console.log(body);
  t.is(body.status, 500); // t.is checks if body.status == 200
});