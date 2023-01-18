/* eslint-disable import/no-unresolved */
require('dotenv').config();

const http = require('node:http');  // Library so i can build a server with express
const test = require('ava').default;
const got = require('got'); // Library so i can make requests
const listen = require('test-listen'); // In testing environment, build a test server to send request

const app = require('../src/index');

const authtoken = process.env.AUTHTOKEN;
const dbid = '63c8127187ee7205495aa3bd';

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
  const token = authtoken;
  const { body, statusCode } = await t.context.got(`dashboards/dashboards?token=${token}`);
  console.log(body);
  t.is(statusCode, 200);
});

// Test for post req dashboards/create-dashboard
test('POST /dashboards returns correct response and status code', async (t) => {
  const token = authtoken;
  const dbname = 'testingDashboard';
  const body = await t.context.got.post(`dashboards/create-dashboard?token=${token}`,{json: {dbname}}).json();
  console.log(body);
  t.assert(body.status); // t.is checks if body.success == true
});

// Test for post req dashboards/delete-dashboard
test('GET /dashboards/delete-dashboards returns correct response and status code', async (t) => {
  const token = authtoken;
  const {body, statusCode} = await t.context.got(`dashboards/delete-dashboard?token=${token}`,{ json: { dbid }  }).json();
  console.log(body);
  if (body.status) {
    t.is(body.status, 409);
  }
  //if body.status == undefined so the dashboard was found
  else {
    t.assert(body.success);
    t.is(statusCode, 200);
    t.is(body.dashboard.name, 'dummyDashboard0');
  }
});

// Test for post req dashboards/dashboard with correct id
test('GET /dashboards/dashboard returns correct response and status code', async (t) => {
  const token = authtoken;
  const wrongid = '2341234'
  const {body, statusCode} = await t.context.got(`dashboards/dashboard?token=${token}&id=${dbid}`);
  if (body.status) {
    t.is(body.status, 409);
  }
  //if body.status == undefined then dashboard was found
  else {
    t.assert(body.success);
    t.is(statusCode, 200);
    t.is(body.dashboard.name, 'dummyDashboard0');
  }
  //console.log(body);
});

// Test for post req dashboards/dashboard with wrong id
test('GET /dashboards/dashboard wrong id', async (t) => {
  const token = authtoken;
  const wrongid = '2341234'
  const {body, statusCode} = await t.context.got(`dashboards/dashboard?token=${token}&id=${wrongid}`);
  if (body.status) {
    t.is(body.status, 409);
  }
  //if body.status == undefined then dashboard was found
  else {
    t.assert(body.success);
    t.is(statusCode, 200);
    t.is(body.dashboard.name, 'dummyDashboard0');
  }
  //console.log(body);
});

test('POST /save-dashboard returns correct response and status code', async t => {
  const token = authtoken;
  const layout = [];
  const items = {};
  const nextId = 3;

  const body = await t.context.got.post(`dashboards/save-dashboard?token=${token}`, {
    json: { dbid, layout, items, nextId }
  }).json();
  t.assert(body.success);

  const wrongid = '2341234'
  const body2 = await t.context.got.post(`dashboards/save-dashboard?token=${token}`, {
    json: { wrongid, layout, items, nextId }
  }).json();

  t.is(body2.status, 409);
});

/*
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

*/
