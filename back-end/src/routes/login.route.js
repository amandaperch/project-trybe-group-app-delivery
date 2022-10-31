const { Router } = require('express');
const LoginController = require('../controllers/login.controller');
// import validateToken from '../middlewares/validateToken.middleware';

const routerLogin = Router();

routerLogin.post('/login', LoginController.login);

module.exports = routerLogin;