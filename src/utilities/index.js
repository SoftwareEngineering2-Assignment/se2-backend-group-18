/*
This script exports an object that contains a single property, mailer, which is the result of requiring the ./mailer module.
This means that the exported object has a reference to the exports of the ./mailer module, and therefore any methods or 
properties that are exported by the ./mailer module will be available on the mailer property of the object exported by this script.
*/
const mailer = require('./mailer');

module.exports = {
  mailer
};
