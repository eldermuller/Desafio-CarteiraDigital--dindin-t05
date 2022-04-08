const express = require('express');
const { registerUser } = require('./controllers/users');

const routes = express();

routes.post('/usuario', registerUser);

module.exports = routes;