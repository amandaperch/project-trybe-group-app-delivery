const { Router } = require('express');
const TokenController = require('../controllers/token.controller');

const routerToken = Router();

routerToken.post('/token', TokenController.token);

module.exports = routerToken;