/* 
This script exports an object that contains two properties which are the exports
of two other modules, password and send.
*/

const password = require('./password');
const send = require('./send');

module.exports = {
  mail: password,
  send
};
