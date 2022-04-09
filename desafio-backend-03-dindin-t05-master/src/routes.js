const express = require('express');
const { registerUser, detailUser, updateUser } = require('./controllers/users');
const login = require('./controllers/login');
const loginVerify = require('./filters/loginVerify');
const categories = require('./controllers/category');

const routes = express();

routes.post('/usuario', registerUser);

routes.post('/login', login);

routes.use(loginVerify);

routes.get('/usuario', detailUser);
routes.put('/usuario', updateUser);

routes.get('/categoria', categories);

module.exports = routes;