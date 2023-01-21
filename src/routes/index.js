/*
This script creates an Express.js Router that defines routes for different functionality
in the application. It exports the router, which will be used in the main application.
It uses 5 other routes files: users, sources, dashboards, general and root. It maps the
routes to the corresponding router. It makes sure that different requests to the server
are handled by the appropriate router based on the request path.
*/

const express = require('express');
const users = require('./users');
const sources = require('./sources');
const dashboards = require('./dashboards');
const general = require('./general');
const root = require('./root');

const router = express.Router();
/* main index for all routes */
router.use('/users', users);
router.use('/sources', sources);
router.use('/dashboards', dashboards);
router.use('/general', general);
router.use('/', root);

module.exports = router;
