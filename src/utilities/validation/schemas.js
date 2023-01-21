/*
This script exports an object containing several Yup validation schemas,
which can be used to validate user input, such as email, username, and password.
The exported object contains the validation schemas for authenticate, register,
request, change and update. Also, it uses the Ramda package to check if the
parameters is Nil or not. These validation schemas are built using various
Yup validation functions, such as string(), trim(), email(), min(), required()
and test(). These validation schemas are used to ensure that the input data meets
certain requirements before it is processed by the application.
*/

const {isNil} = require('ramda');

const yup = require('yup');
const {min} = require('./constants');

const email = yup
  .string()
  .lowercase()
  .trim()
  .email();

const username = yup
  .string()
  .trim();

const password = yup
  .string()
  .trim()
  .min(min);

const request = yup.object().shape({username: username.required()});

const authenticate = yup.object().shape({
  username: username.required(),
  password: password.required()
});

const register = yup.object().shape({
  email: email.required(),
  password: password.required(),
  username: username.required()
});

const update = yup.object().shape({
  username,
  password
}).test({
  message: 'Missing parameters',
  test: ({username: u, password: p}) => !(isNil(u) && isNil(p))
});

const change = yup.object().shape({password: password.required()});

module.exports = {
  authenticate, register, request, change, update
};
