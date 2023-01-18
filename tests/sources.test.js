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

const authtoken = process.env.AUTHTOKEN2;
const test_user = {
  "username": "usertesting",
  "id": "63c7aa08b0ae7a0550648094",
  "email": "usertesting@gmail.com"
};

// Test for post req sources/sources
test('GET /sources returns correct response and status code', async (t) => {
  const token = authtoken;
  const {body,statusCode} = await t.context.got(`sources/sources?token=${token}`);
  t.is(statusCode, 200);
  t.assert(body.success);
});


// Test for post req sources/create-source
test('POST /create-sources returns correct response and status code', async (t) => {
  const token = authToken2;
  const id = '3'
  const name = 'source3';
  const type = 'type3';
  const login = 'login3';
  const url = 'url3';
  const vhost = 'vhost3';
  const passcode = 'pass3';

  const body = await t.context.got.post(`sources/create-source?token=${token}&id=${id}`, {
    json: { name, type, url, login, passcode, vhost }
  }).json();

  if (body.sucess) {
    t.assert(body.success);
  }
  else {
    t.is(body.status, 409);
  }
});

// Test for post req sources/change-source
test('GET /change-sources returns correct response and status code', async (t) => {
  const token = authtoken;
  const id = '63c8127187ee7205495aa3bd' 
  const name = 'source3';
  const type = 'new_type';
  const url = 'new_url';
  const login = 'new_login';
  const passcode = 'new_pass';
  const vhost = 'new_vhost';

  const body = await t.context.got.post(`sources/change-source?token=${token}&id=${id}`, {
    json: { id, name, type, url, login, passcode, vhost }
  }).json();

  if (body.success) {
    t.assert(body.success);
  }
  else {
    t.is(body.status, 409)
  }
});

// Test for post req sources/change-source with wrong id
test('GET /change-sources returns correct response and status code', async (t) => {
  const token = authtoken;
  const id = '63c8127187ee7205495ad3bc' 
  const name = 'source3';
  const type = 'new_type';
  const url = 'new_url';
  const login = 'new_login';
  const passcode = 'new_pass';
  const vhost = 'new_vhost';

  const body = await t.context.got.post(`sources/change-source?token=${token}&id=${id}`, {
    json: { id, name, type, url, login, passcode, vhost }
  }).json();

  if (body.success) {
    t.assert(body.success);
  }
  else {
    t.is(body.status, 409)
  }
});

// Test for post req sources/delete-source with worng id
test('GET /delete-sources returns correct response and status code', async (t) => {
  const token = authtoken;
  const id = '63c8127187ee7205495ad3bc' 
  const {body,statusCode} = await t.context.got(`sources/delete-source?token=${token}`,{
    json: { id }
  }).json();
    t.is(body.status, 409);
});

// Test for post req sources/check-sources
test('GET /check-sources returns correct response and status code', async (t) => {

  const token = authtoken;
  const id = '63c8127187ee7205495ad3bc' 
  const sources = ['another_source', 's2', 's3']; 
  const body = await t.context.got.post(`sources/check-sources?token=${token}&id=${id}`, {
    json: { sources }
  }).json();

  t.assert(body.success);
});

// Test for post /source with correct name
test('POST /source returns correct response', async (t) => {

  const name = 'source'; //wrong source name
  const owner = 'self';
  const user = testing_user;

  const body = await t.context.got.post(`sources/source`, {
    json: { name, owner, user }
  }).json();

  t.assert(body.success);
});

// Test for post /source with wrong name
test('POST /source returns 409 if source not found', async (t) => {

  const name = 's5'; 
  const owner = 'self';
  const user = testing_user;

  const body = await t.context.got.post(`sources/source`, {
    json: { name, owner, user }
  }).json();

  t.is(body.status, 409);
});
