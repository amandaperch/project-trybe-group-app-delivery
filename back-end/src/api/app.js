const express = require('express');
const routerLogin = require('../routes/login.route');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());


app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/', routerLogin);

module.exports = app;
