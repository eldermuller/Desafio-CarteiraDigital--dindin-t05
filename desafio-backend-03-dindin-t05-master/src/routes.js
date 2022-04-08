const express = require('express');
const { registerUser } = require('./controllers/users');
const login = require('./controllers/login');

const routes = express();

routes.post('/usuario', registerUser);

routes.post('/login', login);

module.exports = routes;