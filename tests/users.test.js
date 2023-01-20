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

const userpassword = process.env.USERPASSWORD;
const authtoken = process.env.AUTHTOKEN;
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

// Test for post req users/create if already a user
test('POST /create returns correct response and status code', async (t) => {
  const username = 'usertesting';
  const password = userpassword;
  const email = 'usertesting@gmail.com';
  const body = await t.context.got.post('users/create', {     json: { username, password, email }   }).json(); 
  t.is(body.status, 409);
});

// Test for post req users/authenticate
test('POST /authenticate returns correct response and status code', async (t) => {
  const username = 'usertesting';
  const password = userpassword;
  const body = await t.context.got.post('users/authenticate',{json: {username, password}}).json();
  console.log(body);
  t.is(body.user.username, 'usertesting');
});

// Test for post req users/authenticate with wrong password
test('POST /authenticate returns error if pasword is incorrect', async t => {
  const username = 'usertesting';
  const password = '135790';
  const body = await t.context.got.post('users/authenticate', { json: { username, password }}).json();
  t.is(body.status, 401);
  //console.log(body);
});

// Test for post req users/authenticate with wrong username
test('POST /authenticate returns error if user is incorrect', async t => {
  const username = 'userTesting';
  const password = userpassword;
  const body = await t.context.got.post('users/authenticate', { json: { username, password }}).json();
  t.is(body.status, 401);
  //console.log(body);
});

// Test for post req users/resetpassword with wrong username
test('POST /resetpassword returns correct response and status code', async (t) => {
  const username = 'userTesting';

  const body = await t.context.got.post('users/resetpassword',{ json: {username}}).json();
  t.is(body.status, 404);
  //console.log(body);
});

// Test for post req users/resetpassword with existing username
test('POST /resetpassword returns ok', async (t) => {
  const username = 'userTesting';
  const email = 'usertesting@gmail.com';

  const body = await t.context.got.post('users/resetpassword',{ json: {username, email}}).json();
  t.is(body.status, 404);
  //console.log(body);
});

/*
// Test for post req users/changepassword
test('POST /changepassword change password of a logged in user', async t => {

  const username = 'usertesting';
  const password = userpassword;
  const token = authtoken;

  const body = await t.context.got.post(`users/changepassword?token=${token}`, {     json: { username, password }   }).json(); 
  
  if (body.ok) {
      t.assert(body.ok)   
  }else {
    t.is(body.status, 410);
  } 
});


*/