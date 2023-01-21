/*
This script is a routing module that uses the Express.js framework to handle server requests.
It sets up a single GET route that serves the index.html file at the root directory, and also
serves all static files in the root directory.
*/
const express = require('express');
const path = require('path');

const router = express.Router();

const file = path.join(__dirname, '../../index.html');
router.use(express.static(file));

router.get('/', (req, res) => res.sendFile(file));

module.exports = router;
