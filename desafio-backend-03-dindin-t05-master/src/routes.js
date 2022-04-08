const express = require('express');
const { registerUser } = require('./controllers/users');
const login = require('./controllers/login');
const loginVerify = require('./filters/loginVerify');

const routes = express();

routes.post('/usuario', registerUser);

routes.post('/login', login);

routes.use(loginVerify);

module.exports = routes;