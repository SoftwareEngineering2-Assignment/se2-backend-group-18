/* This script exports an object with a property 'helpers' that references the
exports of a file named 'helpers' located in the same directory. */

const helpers = require('./helpers');

module.exports = {helpers};
