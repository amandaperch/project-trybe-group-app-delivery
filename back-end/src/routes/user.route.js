const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const routerUser = Router();

routerUser.post('/register', UserController.createUser);

module.exports = routerUser;