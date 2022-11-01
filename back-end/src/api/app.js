const express = require('express');
const cors = require('cors');
const routerLogin = require('../routes/login.route');
const routerUser = require('../routes/user.route');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/', routerLogin);
app.use(routerUser);

module.exports = app;
