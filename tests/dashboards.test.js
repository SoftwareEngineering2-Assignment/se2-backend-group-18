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

// Test for post req dashboards/dashboards
test('GET /dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/dashboards');
  console.log(body);
  t.assert(body.success); // t.is checks if body.status == true
});

// Test for post req dashboards/create-dashboard
test('GET /dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/create-dashboard');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/delete-dashboard
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/delete-dashboard');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/dashboard
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/dashboard');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/save-dashboard
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/save-dashboard');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/clone-dashboard
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/clone-dashboard');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});


// Test for post req dashboards/check-password-needed
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/check-password-needed');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/check-password
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/check-password');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/share-dashboard
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/share-dashboard');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});

// Test for post req dashboards/change-password
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const {body} = await t.context.got('dashboards/change-password');
  console.log(body);
  t.assert(body.success); // t.is checks if body.success == true
});
